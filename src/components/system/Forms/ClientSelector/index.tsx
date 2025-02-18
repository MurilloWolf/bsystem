import useBudgetContext from "@/app/context/Budget/useBudgetContext";
import {
  Table,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
  SheetHeader,
  SheetTitle,
  SheetContent,
  Sheet,
  SheetTrigger,
  Input,
  RadioGroup,
  Label,
  RadioGroupItem,
  Button,
} from "@/components/ui";
import { ClientModel } from "@/core/model/client.model";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function ClientSelector() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchParam, setSearchParam] = useState("name");
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientModel[]>([]);

  const [value] = useDebounce(search, 800);
  const { getAllClients, selectClient } = useBudgetContext();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      let filtered = clients;
      if (searchParam === "name") {
        filtered = clients.filter((client) =>
          client.name.toLowerCase().includes(value.toLowerCase())
        );
      } else {
        filtered = clients.filter((client) =>
          client.email.toLowerCase().includes(value.toLowerCase())
        );
      }

      setFilteredClients(filtered);
    },
    [clients, searchParam]
  );

  const handleSelectClient = useCallback(
    (client: ClientModel) => {
      selectClient(client);
      setOpen(false);
    },
    [selectClient]
  );

  useEffect(() => {
    const findClients = async () => {
      const response = await getAllClients();
      console.log("ALL CLIENTS< ", response);
      setClients(response);
      setFilteredClients(response);
    };
    findClients();
  }, [getAllClients]);

  useEffect(() => {
    handleSearch(value);
  }, [value, handleSearch]);

  return (
    <section>
      <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger className="h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
          Buscar cliente
        </SheetTrigger>
        <SheetContent className=" min-w-[500px] max-w-[600px] w-fit">
          <SheetHeader>
            <SheetTitle className="text-2xl">Selecione um cliente</SheetTitle>
          </SheetHeader>
          <form className="py-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              placeholder="Buscar cliente"
              onChange={handleChange}
              value={search}
            />
            <RadioGroup
              defaultValue={searchParam}
              className="flex flex-row gap-4 py-4"
              onValueChange={setSearchParam}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="name" id="name" />
                <Label htmlFor="name">Nome</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
            </RadioGroup>
          </form>
          <Table className="text-xs w-full">
            <TableCaption>Lista de todos os seus clientes</TableCaption>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="py-2">{client.name}</TableCell>
                  <TableCell className="py-2">{client.email}</TableCell>
                  <TableCell className="py-2 flex justify-center px-0">
                    <Button
                      variant="outline"
                      type="button"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSelectClient(client)}
                    >
                      Selecionar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SheetContent>
      </Sheet>
    </section>
  );
}
