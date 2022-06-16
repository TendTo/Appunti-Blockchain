import { Config, Ropsten } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

const config: Config = {
  readOnlyChainId: Ropsten.chainId,
  readOnlyUrls: {
    [Ropsten.chainId]: getDefaultProvider("ropsten"),
  },
};

export default config;
