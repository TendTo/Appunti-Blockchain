import React from "react";
import { useGenerator, useLogs } from "../../hooks";
import { TournamentShow } from "./TournamentShow";

export function TournamentList() {
  const generator = useGenerator();
  const { value } = useLogs({
    contract: generator,
    event: "NewTournament",
    args: [],
  });

  return (
    <div>
      <h1>Tournaments</h1>
      <ul>
        {value &&
          value.map((log) => {
            const [p0, p1, tournament] = log.data as [string, string, string];
            return (
              <TournamentShow
                key={tournament}
                tournament={tournament}
                p0={p0}
                p1={p1}
              />
            );
          })}
      </ul>
    </div>
  );
}
