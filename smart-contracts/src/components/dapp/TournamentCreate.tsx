import React, { useState } from "react";
import { useGenerator } from "../../hooks";
import addIcon from "../../asset/icon/add.svg";
import { useContractFunction, useEthers } from "@usedapp/core";
import { toast } from "react-toastify";
import { useContractCallToast } from "../../hooks/useContractCallToast";

export function TournamentCreate() {
  const { account } = useEthers();
  const generator = useGenerator();
  const { send, state } = useContractFunction(generator, "startTournament");
  useContractCallToast(state);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    opponent: "",
    numRounds: "",
    minFee: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { opponent, numRounds, minFee } = inputs;
    if (
      !opponent ||
      isNaN(parseInt(numRounds)) ||
      isNaN(parseInt(minFee)) ||
      !account
    ) {
      toast("Invalid input", { type: "error" });
      return;
    }
    if (account === opponent) {
      toast("The opponent can't be yourself", { type: "error" });
      return;
    }
    setLoading(true);
    send(account, opponent, parseInt(numRounds), parseInt(minFee)).finally(() =>
      setLoading(false),
    );
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="mt-5 md:mt-0">
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Opponent's Address
                  </label>
                  <input
                    type="text"
                    name="opponent"
                    id="opponent"
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    pattern="^0x[a-fA-F0-9]{40}$"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="numRounds"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Rounds
                  </label>
                  <input
                    type="number"
                    name="numRounds"
                    id="numRounds"
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    pattern="^[0-9]{1,2}$"
                    min={1}
                    max={99}
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="minFee"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fee per Round
                  </label>
                  <input
                    type="number"
                    name="minFee"
                    id="minFee"
                    onChange={handleChange}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    pattern="^[0-9]{1,5}$"
                    min={0}
                    max={1000000}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                disabled={loading}
                className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <img src={addIcon} alt="React Logo" className="w-12 h-12 p-3" />
                Create new Tournamen
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
