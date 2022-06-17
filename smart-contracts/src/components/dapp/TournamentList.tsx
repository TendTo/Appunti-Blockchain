import React from "react";
import { useTournaments } from "../../hooks";
import { TournamentShow } from "./TournamentShow";

export function TournamentList() {
  const { inProgress, lost, won } = useTournaments();
  console.log(inProgress, lost, won);

  return (
    <div>
      <h1>Tournaments</h1>
      <ul>
        {inProgress.map(({ opponent, tournament }) => {
          return (
            <TournamentShow
              key={tournament}
              tournament={tournament}
              opponent={opponent}
            />
          );
        })}
      </ul>
    </div>
  );
}
