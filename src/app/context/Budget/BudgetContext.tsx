/* eslint-disable @typescript-eslint/no-unused-vars */
import { ClientModel } from "@/core/model/client.model";
import { createContext } from "react";

export type BudgetContextType = {
  client: ClientModel | null;
  selectClient: (client: ClientModel) => void;
  getAllClients: () => Promise<ClientModel[]>;
  clearSelectedClient?: () => void;
};

export const defaultValues = {
  client: null,
  selectClient: (client: ClientModel) => {},
  getAllClients: async () => {
    return [];
  },
  clearSelectedClient: () => {},
};

export const BudgetContext = createContext<BudgetContextType>(defaultValues);
