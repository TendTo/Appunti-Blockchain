import { DAppProvider } from "@usedapp/core";
import React, { useMemo, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/useDAppconfig";

type ContextProviderProps = {
  children: React.ReactNode;
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [mode, setMode] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "light" ? "light" : "dark"
  );
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("theme", newMode);
          return newMode;
        });
      },
    }),
    []
  );

  return (
    <DAppProvider config={config}>
      {children}
      <ToastContainer />
    </DAppProvider>
  );
}
