import { useMemo } from "react";
import { useGenerator } from "./useGenerator";
import { useLogs } from "./useLogs";
import { useEthers } from "@usedapp/core";
import { DetailedEventRecord } from "@usedapp/core/dist/esm/src/model/types";
import { Contract } from "ethers";

function logToTournament(
  log: DetailedEventRecord<Contract, string>,
  account?: string,
) {
  return {
    tournament: log.data[2],
    opponent: account === log.data[0] ? log.data[1] : log.data[0],
  };
}

export function useTournaments() {
  const { account } = useEthers();
  const generator = useGenerator();

  const { value: p0tournaments = [] } = useLogs({
    contract: generator,
    event: "NewTournament",
    args: [account],
  });

  const { value: p1tournaments = [] } = useLogs({
    contract: generator,
    event: "NewTournament",
    args: [undefined, account],
  });

  const tournaments = useMemo(
    () => p0tournaments.concat(p1tournaments),
    [p0tournaments, p1tournaments],
  );
  const { value: endedTournaments = [] } = useLogs({
    contract: generator,
    event: "EndTournament",
    args: [tournaments.map((tournament) => tournament.data[2]) as any],
  });

  return useMemo(() => {
    const won: string[] = [],
      lost: string[] = [],
      ended: string[] = [];
    for (const tournament of endedTournaments) {
      if (tournament.data[1] === account) won.push(tournament.data[0]);
      else lost.push(tournament.data[0]);
      ended.push(tournament.data[0]);
    }

    return {
      inProgress: tournaments
        .filter((tournament) => !ended.includes(tournament.data[2]))
        .map((tournament) => logToTournament(tournament, account)),
      won: tournaments
        .filter((tournament) => won.includes(tournament.data[2]))
        .map((tournament) => logToTournament(tournament, account)),
      lost: tournaments
        .filter((tournament) => lost.includes(tournament.data[2]))
        .map((tournament) => logToTournament(tournament, account)),
    };
  }, [tournaments, endedTournaments, account]);
}
