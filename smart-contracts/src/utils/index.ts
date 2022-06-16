import { CallResult } from "@usedapp/core";
import { ContractMethodNames } from "@usedapp/core/dist/esm/src/model/types";
import { Contract } from "ethers";

export function parseResult<
  C extends Contract,
  F extends ContractMethodNames<C>,
  R extends CallResult<C, F>,
>(result: R | undefined) {
  return result?.value ?? [];
}
