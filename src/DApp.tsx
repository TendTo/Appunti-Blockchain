import { useEthers } from "@usedapp/core";
import React from "react";
import { LoginPage } from "./components";

function DApp() {
  const { active, account } = useEthers();
  return active && account ? <div>Fest</div> : <LoginPage />;
}

export default DApp;
