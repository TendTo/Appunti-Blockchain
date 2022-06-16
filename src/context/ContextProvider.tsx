import { ThemeContextProvider } from "./themeContext";
import { DAppProvider } from "@usedapp/core";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config/useDAppconfig";

type ContextProviderProps = {
  children: React.ReactNode;
};

export function ContextProvider({ children }: ContextProviderProps) {
  return (
    <ThemeContextProvider>
      <DAppProvider config={config}>
        {children}
        <ToastContainer />
      </DAppProvider>
    </ThemeContextProvider>
  );
}
