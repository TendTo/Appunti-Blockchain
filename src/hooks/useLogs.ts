import { useLogs as useBaseLogs, LogQueryParams } from "@usedapp/core";
import { Contract } from "ethers";

type UseLogsFilter<
  C extends Contract,
  F extends keyof C["filters"] & string,
> = {
  contract?: C;
  event: F;
  args: Parameters<C["filters"][F]>;
};

/**
 * Makes a call to get the logs for a specific contract event and returns the decoded logs or an error if present.
 * The hook will cause the component to refresh when a new block is mined and the returned logs change.
 * A syntax sugar for {@link useRawLogs} that uses ABI, event name, and arguments instead of raw data.
 * @param filter an event filter (see {@link TypedFilter})
 * @param queryParams allows for additional configuration of the query (see {@link LogQueryParams})
 * @returns an array of decoded logs (see {@link LogsResult})
 * @public
 */
export function useLogs<
  C extends Contract,
  F extends keyof C["filters"] & string,
>(filter: UseLogsFilter<C, F>, queryParams: LogQueryParams = {}) {
  const { contract } = filter;
  return (
    useBaseLogs(contract ? { ...filter, contract } : false, queryParams) ?? {
      error: new Error("Contract not found"),
      value: undefined,
    }
  );
}
