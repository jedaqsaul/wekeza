import { useContext } from "react";
import { TransactionActionsContext } from "../context/TransactionActionsContext.jsx";

export function useTransactionActions() {
  const ctx = useContext(TransactionActionsContext);
  if (!ctx) throw new Error("useTransactionActions must be used within TransactionActionsProvider");
  return ctx;
}
