import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import ClientForm from "../ClientForm/ClientForm";
import useBudgetContext from "@/app/context/Budget/useBudgetContext";
import ClientSelector from "../ClientForm/ClientSelector";
import { useRouter } from "next/navigation";

export default function BudgetWizzard() {
  const { client, clearSelectedClient } = useBudgetContext();
  const route = useRouter();

  const handleInitializeBudget = () => {
    route.push("/dashboard/budget");
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger className="p-2 bg-black hover:bg-gray-900 rounded-md text-md transition-all ease-in duration-100 text-white">
          Novo orçamento
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar orçamento</DialogTitle>
            <DialogDescription>
              O novo orçamento é para um cliente existente ou um novo cliente?
            </DialogDescription>
            {/* BUDGET CLIENT */}
            {client ? (
              <Card>
                <CardHeader className="text-sm text-gray-500">
                  <h3 className="text-xl text-black">{client.name}</h3>
                  <div className="py-2">
                    <p>{client.email}</p>
                    <p>{client.phone}</p>
                    <p>
                      {client.city} - {client.uf}
                    </p>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between flex-row-reverse">
                  <Button
                    type="button"
                    className="min-w-[150px]"
                    onClick={handleInitializeBudget}
                  >
                    Continuar
                  </Button>
                  <Button
                    type="button"
                    className="min-w-[150px]"
                    variant="outline"
                    onClick={clearSelectedClient}
                  >
                    Cancelar
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="flex flex-row gap-4 w-full py-2 justify-between">
                <ClientForm />
                <ClientSelector />
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
