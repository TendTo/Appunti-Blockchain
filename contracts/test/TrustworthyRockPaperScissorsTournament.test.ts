import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  TrustworthyRockPaperScissorsTournament,
  TrustworthyRockPaperScissorsTournamentGenerator,
  TrustworthyRockPaperScissorsTournament__factory,
} from "../typechain";

describe("TrustworthyRockPaperScissorsTournament", function () {
  const minFee = 5,
    targetWins = 10,
    minFeeError = "Minimum fee not met",
    nonPlayerError = "Only players can call this function",
    minVal = { value: minFee };

  let owner: SignerWithAddress,
    player0: SignerWithAddress,
    player1: SignerWithAddress,
    generator: TrustworthyRockPaperScissorsTournamentGenerator,
    contractFactory: TrustworthyRockPaperScissorsTournament__factory,
    contract: TrustworthyRockPaperScissorsTournament,
    p0Contract: TrustworthyRockPaperScissorsTournament,
    p1Contract: TrustworthyRockPaperScissorsTournament;

  before(async () => {
    [owner, player0, player1] = await ethers.getSigners();
    contractFactory = await ethers.getContractFactory(
      "TrustworthyRockPaperScissorsTournament"
    );
    const generatorFactory = await ethers.getContractFactory(
      "TrustworthyRockPaperScissorsTournamentGenerator"
    );
    generator = await generatorFactory.deploy();
  });

  beforeEach(async function () {
    contract = await contractFactory.deploy(
      player0.address,
      player1.address,
      targetWins,
      minFee,
      generator.address
    );
    p0Contract = contract.connect(player0);
    p1Contract = contract.connect(player1);
  });

  it("the two players should be player1 and player2", async function () {
    expect(await contract.getPlayers()).to.have.members([
      player0.address,
      player1.address,
    ]);
  });

  it("targetWins and singleMatchFee are set", async function () {
    expect(await contract.targetWins()).to.equal(targetWins);
    expect(await contract.singleMatchFee()).to.equal(minFee);
  });

  it("disputedMatches and player wins are all 0", async function () {
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(0),
      BigNumber.from(0),
    ]);
    expect(await contract.disputedMatches()).to.equal(0);
  });

  it("constructor input validation", async function () {
    await expect(
      contractFactory.deploy(
        player0.address,
        player0.address,
        targetWins,
        minFee,
        generator.address
      )
    ).revertedWith("Players must be different");

    await expect(
      contractFactory.deploy(
        ethers.constants.AddressZero,
        player1.address,
        1,
        2,
        generator.address
      )
    ).revertedWith("Both players must be specified");

    await expect(
      contractFactory.deploy(
        player0.address,
        player1.address,
        0,
        minFee,
        generator.address
      )
    ).revertedWith("Target wins must be greater than 0");
  });

  it("non players cannot make a move", async function () {
    await expect(contract.movePaper()).to.be.revertedWith(nonPlayerError);
    await expect(contract.moveRock()).to.be.revertedWith(nonPlayerError);
    await expect(contract.moveScissor()).to.be.revertedWith(nonPlayerError);
  });

  it("non player cannot know the move a player made", async function () {
    await expect(contract.getCurrentMove()).to.be.revertedWith(nonPlayerError);
  });

  it("the match fee must be payed for players to make a move", async function () {
    await expect(p0Contract.movePaper()).to.be.revertedWith(minFeeError);
    await expect(p0Contract.moveRock()).to.be.revertedWith(minFeeError);
    await expect(p0Contract.moveScissor()).to.be.revertedWith(minFeeError);
  });

  
  it("a player can know what move has made this round", async function () {
    expect(await p0Contract.getCurrentMove()).to.be.equal(0);
    await p0Contract.movePaper(minVal);
    expect(await p0Contract.getCurrentMove()).to.be.equal(2);
    expect(await p1Contract.getCurrentMove()).to.be.equal(0);
  });

  it("a player cannot make two moves in a row", async function () {
    await p0Contract.movePaper(minVal);
    await expect(p0Contract.moveRock(minVal)).to.be.revertedWith(
      "Player already made a move"
    );
  });

  it("the match is a draw", async function () {
    await p0Contract.movePaper(minVal);
    await p1Contract.movePaper(minVal);
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(0),
      BigNumber.from(0),
    ]);
    expect(await contract.numMatch()).to.equal(1);
  });

  it("player 0 wins", async function () {
    await p0Contract.moveRock(minVal);
    await expect(p1Contract.moveScissor(minVal))
      .to.emit(contract, "MatchWonBy")
      .withArgs(0, 1);
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(1),
      BigNumber.from(0),
    ]);
    expect(await contract.numMatch()).to.equal(1);
  });

  it("player 1 wins", async function () {
    await p0Contract.moveScissor(minVal);
    await expect(p1Contract.moveRock(minVal))
      .to.emit(contract, "MatchWonBy")
      .withArgs(1, 1);
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(0),
      BigNumber.from(1),
    ]);
    expect(await contract.numMatch()).to.equal(1);
  });

  it("player 0 wins the tournament", async function () {
    for (let i = 0; i < targetWins - 1; i++) {
      await p0Contract.movePaper(minVal);
      await p1Contract.moveRock(minVal);
    }
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(targetWins - 1),
      BigNumber.from(0),
    ]);
    expect(await contract.numMatch()).to.equal(targetWins - 1);

    await p0Contract.moveScissor(minVal);
    await expect(p1Contract.movePaper(minVal))
      .to.emit(contract, "TournamentWonBy")
      .withArgs(0);
    await expect(contract.getPlayers()).to.be.reverted;
  });

  it("player 1 wins the tournament - one sided", async function () {
    for (let i = 0; i < targetWins - 1; i++) {
      await p0Contract.moveRock(minVal);
      await p1Contract.movePaper(minVal);
    }
    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(0),
      BigNumber.from(targetWins - 1),
    ]);
    expect(await contract.numMatch()).to.equal(targetWins - 1);

    await p0Contract.movePaper(minVal);
    await expect(p1Contract.moveScissor(minVal))
      .to.emit(contract, "TournamentWonBy")
      .withArgs(1);
    await expect(contract.getPlayers()).to.be.reverted;
  });

  it("random play", async function () {
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

    expect(await contract.getPlayersWins()).to.have.deep.ordered.members([
      BigNumber.from(p0Wins),
      BigNumber.from(p1Wins),
    ]);
    expect(await contract.numMatch()).to.equal(numMatches);

    const winnerContract = p0Wins > p1Wins ? p0Contract : p1Contract;
    const loserContract = p0Wins < p1Wins ? p0Contract : p1Contract;

    await loserContract.movePaper(minVal);
    await expect(winnerContract.moveScissor(minVal))
      .to.emit(contract, "TournamentWonBy")
      .withArgs(p0Wins > p1Wins ? 0 : 1);
    await expect(contract.getPlayers()).to.be.reverted;
  });
});
