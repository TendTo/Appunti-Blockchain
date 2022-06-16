import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  TrustworthyRockPaperScissorsTournamentGenerator,
  TrustworthyRockPaperScissorsTournamentGenerator__factory,
  TrustworthyRockPaperScissorsTournament__factory,
} from "../typechain";

describe("TrustworthyRockPaperScissorsTournamentGenerator", function () {
  const minFee = 5,
    targetWins = 10,
    minVal = { value: minFee };

  let owner: SignerWithAddress,
    player0: SignerWithAddress,
    player1: SignerWithAddress,
    generatorFactory: TrustworthyRockPaperScissorsTournamentGenerator__factory,
    generator: TrustworthyRockPaperScissorsTournamentGenerator;

  const startTournament = async () => {
    const tx = await (
      await generator.startTournament(
        player0.address,
        player1.address,
        targetWins,
        minFee,
      )
    ).wait();
    const log = generator.interface.parseLog(tx.logs[0]);
    const p0Contract = TrustworthyRockPaperScissorsTournament__factory.connect(
      log.args.tournament,
      player0,
    );
    const p1Contract = p0Contract.connect(player1);
    return [p0Contract, p1Contract] as const;
  };

  before(async () => {
    [owner, player0, player1] = await ethers.getSigners();
    generatorFactory = await ethers.getContractFactory(
      "TrustworthyRockPaperScissorsTournamentGenerator",
    );
  });

  beforeEach(async function () {
    generator = await generatorFactory.deploy();
  });

  it("create a new tournament", async function () {
    const txInProgress = generator.startTournament(
      player0.address,
      player1.address,
      targetWins,
      minFee,
    );
    await expect(txInProgress).to.emit(generator, "NewTournament");

    const tx = await (await txInProgress).wait();
    expect(tx.logs).to.have.length(1);

    const log = generator.interface.parseLog(tx.logs[0]);
    expect(log.args.player0).to.be.not.empty;
    expect(log.args.player1).to.be.not.empty;
    expect(log.args.tournament).to.be.not.empty;
  });

  it("player 0 wins the tournament", async function () {
    const [p0Contract, p1Contract] = await startTournament();

    for (let i = 0; i < targetWins - 1; i++) {
      await p0Contract.movePaper(minVal);
      await p1Contract.moveRock(minVal);
    }
    expect(await p0Contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(targetWins - 1),
      BigNumber.from(0),
    ]);
    expect(await p0Contract.numMatch()).to.equal(targetWins - 1);

    await p0Contract.moveScissor(minVal);
    await expect(p1Contract.movePaper(minVal))
      .to.emit(generator, "EndTournament")
      .withArgs(p0Contract.address, player0.address);
    await expect(p0Contract.getPlayers()).to.be.reverted;
  });

  it("player 1 wins the tournament - one sided", async function () {
    const [p0Contract, p1Contract] = await startTournament();

    for (let i = 0; i < targetWins - 1; i++) {
      await p0Contract.moveRock(minVal);
      await p1Contract.movePaper(minVal);
    }
    expect(await p0Contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(0),
      BigNumber.from(targetWins - 1),
    ]);
    expect(await p0Contract.numMatch()).to.equal(targetWins - 1);

    await p0Contract.movePaper(minVal);
    await expect(p1Contract.moveScissor(minVal))
      .to.emit(generator, "EndTournament")
      .withArgs(p0Contract.address, player1.address);
    await expect(p0Contract.getPlayers()).to.be.reverted;
  });

  it("random play", async function () {
    const [p0Contract, p1Contract] = await startTournament();

    const play = async (winner: 0 | 1 | 2) => {
      const contracts = [p0Contract, p1Contract];
      if (winner === 1) contracts.reverse();
      if (winner === 2) {
        await contracts[0].moveRock(minVal);
        await contracts[1].moveRock(minVal);
      } else {
        await contracts[0].moveScissor(minVal);
        await contracts[1].movePaper(minVal);
      }
    };

    let p0Wins = 0,
      p1Wins = 0,
      numMatches = 0;
    while (p0Wins < targetWins - 1 && p1Wins < targetWins - 1) {
      const winner = Math.floor(Math.random() * 3) as 0 | 1 | 2;
      await play(winner);
      if (winner === 0) p0Wins++;
      else if (winner === 1) p1Wins++;
      numMatches++;
    }

    expect(await p0Contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(p0Wins),
      BigNumber.from(p1Wins),
    ]);
    expect(await p0Contract.numMatch()).to.equal(numMatches);

    const winnerContract = p0Wins > p1Wins ? p0Contract : p1Contract;
    const loserContract = p0Wins < p1Wins ? p0Contract : p1Contract;

    await loserContract.movePaper(minVal);
    await expect(winnerContract.moveScissor(minVal))
      .to.emit(generator, "EndTournament")
      .withArgs(
        p0Contract.address,
        p0Wins > p1Wins ? player0.address : player1.address,
      );
    await expect(p0Contract.getPlayers()).to.be.reverted;
  });
});
