import React, { useMemo } from "react";
import { useTournament } from "../../hooks";

type TournamentShowProps = {
  opponent: string;
  tournament: string;
};

enum Move {
  None = 0,
  Rock = 1,
  Paper = 2,
  Scissor = 3,
}

function buttonClass(active: boolean, disabled: boolean) {
  return active
    ? "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    : disabled
    ? "bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
    : "bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded";
}

export function TournamentShow({ tournament, opponent }: TournamentShowProps) {
  const {
    account,
    results,
    move: [{ send: moveRock }, { send: movePaper }, { send: moveScissor }],
  } = useTournament(tournament);

  const [p0Wins, p1Wins, numRounds, minFee, move] = useMemo(
    () => [
      results[0]?.value?.at(0)?.at(0)?.toString() ?? "0",
      results[0]?.value?.at(0)?.at(1)?.toString() ?? "0",
      results[1]?.value?.at(0) ?? 0,
      results[2]?.value?.at(0)?.toNumber() ?? 0,
      Move[results[3]?.value ?? 0] as keyof typeof Move,
    ],
    [results],
  );
  const moveMade = move !== "None";

  return (
    <div>
      <h1>Tournament - {tournament}</h1>
      <table>
        <thead>
          <tr>
            <th>{account}</th>
            <th>Vs.</th>
            <th>{opponent}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-center">{p0Wins}</td>
            <td className="text-center">{numRounds}</td>
            <td className="text-center">{p1Wins}</td>
          </tr>
          <tr>
            <td className="text-center">
              <button
                disabled={moveMade}
                className={buttonClass(move === "Rock", moveMade)}
                onClick={() => moveRock({ value: minFee })}
              >
                Rock
              </button>
            </td>
            <td className="text-center">
              <button
                disabled={moveMade}
                className={buttonClass(move === "Paper", moveMade)}
                onClick={() => movePaper({ value: minFee })}
              >
                Paper
              </button>
            </td>
            <td className="text-center">
              <button
                disabled={moveMade}
                className={buttonClass(move === "Scissor", moveMade)}
                onClick={() => moveScissor({ value: minFee })}
              >
                Scissor
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
