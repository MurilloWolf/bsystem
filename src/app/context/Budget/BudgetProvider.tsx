import { useState } from "react";
import { BudgetContext } from "./BudgetContext";
import { ClientModel } from "@/core/model/client.model";
import FindClients from "@/core/use-cases/find-clients";
import { useControllerContext } from "../Controller";

type BudgetProviderProps = {
  children: React.ReactNode;
};

export default function BudgetProvider(props: BudgetProviderProps) {
  const { children } = props;
  const [client, setClient] = useState<ClientModel | null>({
    id: "1",
    userId: "1",
    document: "123456789",
    name: "Murillo",
    email: "mwolf@gmail.com",
    phone: "1892301231",
    neighborhood: "Jardin Aviação",
    city: "Presidente Prudente",
    uf: "SP",
    zipCode: "19000000",
    birthDate: new Date(),
  });
  const { ClientRepository } = useControllerContext();

  const selectClient = (client: ClientModel) => {
    setClient(client);
  };

  const getAllClients = async () => {
    const findClients = new FindClients(ClientRepository);
    const response = await findClients.execute();
    return response || [];
  };

  const clearSelectedClient = () => {
    setClient(null);
  };

  const budgetContextValue = {
    client: client as ClientModel | null,
    selectClient,
    getAllClients,
    clearSelectedClient,
  };

  return (
    <BudgetContext.Provider value={budgetContextValue}>
      {children}
    </BudgetContext.Provider>
  );
}
