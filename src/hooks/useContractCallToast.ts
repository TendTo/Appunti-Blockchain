import { TransactionStatus } from "@usedapp/core";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useContractCallToast(
  state: TransactionStatus,
  resetState?: () => void,
) {
  useEffect(() => {
    toast.dismiss();
    switch (state.status) {
      case "Success":
        toast.success("The transaction was successful");
        resetState && resetState();
        break;
      case "Fail":
      case "Exception":
        toast.error(state.errorMessage);
        resetState && resetState();
        break;
      case "Mining":
        toast.loading("The transaction is being processed...");
        break;
      case "PendingSignature":
        toast.info("Sign the transaction with your wallet");
        break;
      default:
        break;
    }
  }, [state, resetState]);
}
