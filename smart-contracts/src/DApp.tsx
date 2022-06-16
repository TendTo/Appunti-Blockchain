import React from "react";
import { useEthers } from "@usedapp/core";
import { LoginPage, TournamentCreate, TournamentList } from "./components";

function DApp() {
  const { active, account } = useEthers();
  return active && account ? (
    <main>
      <TournamentList />
      <TournamentCreate />
    </main>
  ) : (
    <LoginPage />
  );
}

export default DApp;
