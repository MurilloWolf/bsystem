import { useContext } from "react";
import { BudgetContext } from "./BudgetContext";

export default function useBudgetContext() {
  const { client, selectClient, getAllClients, clearSelectedClient } =
    useContext(BudgetContext);

  return {
    client,
    selectClient,
    getAllClients,
    clearSelectedClient,
  };
}
