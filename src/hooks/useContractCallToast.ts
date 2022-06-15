import { TransactionStatus } from "@usedapp/core";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function useContractCallToast(state: TransactionStatus, resetState: () => void) {
  useEffect(() => {
    switch (state.status) {
      case "Success":
        toast.dismiss();
        toast.success("Demand set");
        resetState();
        break;
      case "Fail":
      case "Exception":
        toast.dismiss();
        toast.error(state.errorMessage);
        resetState();
        break;
      case "Mining":
        toast.dismiss();
        toast.loading("The transaction is being processed, please wait...");
        break;
      case "PendingSignature":
        toast.dismiss();
        toast.info("Sign the transaction with your wallet", {
          toastId: "demand",
        });
        break;
      default:
        break;
    }
  }, [state, resetState]);
}
