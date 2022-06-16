import { useEthers } from "@usedapp/core";
import { useMemo } from "react";
import { TrustworthyRockPaperScissorsTournamentGenerator__factory as GeneratorFactory } from "../typechain";
import Addresses from "../config/contracts.config.json";

export function useGenerator() {
  const { library } = useEthers();
  return useMemo(
    () =>
      library
        ? GeneratorFactory.connect(
            Addresses.TrustworthyRockPaperScissorsTournamentGenerator,
            library,
          )
        : undefined,
    [library],
  );
}
