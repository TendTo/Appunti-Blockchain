import {
  useEthers,
  useCalls,
  Call,
  CallResult,
  useContractFunction,
  useBlockNumber,
} from "@usedapp/core";
import { CallOverrides } from "ethers";
import { useCallback, useEffect, useMemo } from "react";
import {
  TrustworthyRockPaperScissorsTournament,
  TrustworthyRockPaperScissorsTournament__factory as ContractFactory,
} from "../typechain";
import { useAsync } from "./useAsync";
import { useContractCallToast } from "./useContractCallToast";

type ResultsType = [
  CallResult<TrustworthyRockPaperScissorsTournament, "getPlayersWins">,
  CallResult<TrustworthyRockPaperScissorsTournament, "numMatch">,
  CallResult<TrustworthyRockPaperScissorsTournament, "singleMatchFee">,
  { value: number; error?: Error },
];

export function useTournament(contractAddress: string) {
  const number = useBlockNumber();
  const { library, account } = useEthers();
  const contract = useMemo(
    () =>
      library && contractAddress
        ? ContractFactory.connect(contractAddress, library)
        : undefined,
    [library, contractAddress],
  );

  const { fromUser, getCurrentMove } = useMemo(
    () => ({
      fromUser: {
        from: account,
      },
      getCurrentMove:
        contract?.getCurrentMove ?? ((_?: CallOverrides) => Promise.resolve(0)),
    }),
    [account, contract],
  );

  const results = useCalls([
    { contract, method: "getPlayersWins", args: [] },
    { contract, method: "numMatch", args: [] },
    { contract, method: "singleMatchFee", args: [] },
  ] as Call<TrustworthyRockPaperScissorsTournament>[]) as [
    CallResult<TrustworthyRockPaperScissorsTournament, "getPlayersWins">,
    CallResult<TrustworthyRockPaperScissorsTournament, "numMatch">,
    CallResult<TrustworthyRockPaperScissorsTournament, "singleMatchFee">,
  ];
  const { value, error, execute } = useAsync<number, CallOverrides>(
    getCurrentMove,
  );

  useEffect(() => {
    execute(fromUser);
  }, [fromUser, number, execute]);

  const moveRock = useContractFunction(contract, "moveRock");
  const movePaper = useContractFunction(contract, "movePaper");
  const moveScissor = useContractFunction(contract, "moveScissor");

  useContractCallToast(moveRock.state);
  useContractCallToast(movePaper.state);
  useContractCallToast(moveScissor.state);

  return {
    contract,
    results: [...results, { value, error }] as ResultsType,
    move: [moveRock, movePaper, moveScissor],
  };
}
