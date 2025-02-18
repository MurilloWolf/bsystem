import useService from "@/app/context/App/hooks/useService";
import { useControllerContext } from "@/app/context/Controller";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  Popover,
  PopoverTrigger,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Checkbox,
  CardFooter,
} from "@/components/ui";
import { ServiceModel } from "@/core/model/service.model";
import { Label } from "@radix-ui/react-label";
import { PopoverContent } from "@radix-ui/react-popover";
import { ArrowDown, ArrowUp, ArrowUpDown, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function ServicesSelection() {
  const { addServices } = useService();
  const { ServiceRepository } = useControllerContext();

  const [openTablePopover, setOpenTablePopover] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [search, setSearch] = useState("");
  const [ordenation, setOrdenation] = useState("default");
  const [filteredServices, setFilteredServices] = useState<ServiceModel[]>([]);
  const [searchValue] = useDebounce(search, 800);

  const handleSelectService = (id: string) => {
    const isSelected = selectedServices.includes(id);

    if (isSelected) {
      setSelectedServices((prev) => prev.filter((service) => service !== id));
      return;
    }
    setSelectedServices((prev) => [...prev, id]);
  };

  const handleSelectAll = useCallback(() => {
    const allServices = services.map((services) => services.id);
    setSelectedServices(allServices);
  }, [services]);

  const handleDisselectAll = useCallback(() => {
    setSelectedServices([]);
  }, []);

  const filterByRange = useCallback(
    (ordenation: string, data: ServiceModel[]) => {
      return [...data].sort((a, b) => {
        if (ordenation === "desc") {
          return a.price - b.price;
        }
        if (ordenation === "asc") {
          return b.price - a.price;
        }
        return a.name.localeCompare(b.name);
      });
    },
    []
  );

  const changeOrdenation = (value: string) => {
    setOrdenation(value);
    const sortedServices = filterByRange(value, services);

    setFilteredServices(sortedServices);
    setOpenTablePopover(false);
  };

  const getOdernationIcon = () => {
    const ordenationIcons = {
      asc: <ArrowUp size={16} />,
      desc: <ArrowDown size={16} />,
      default: <ArrowUpDown size={16} />,
    };

    return ordenationIcons[ordenation as keyof typeof ordenationIcons];
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = useCallback(() => {
    const filtered = services.filter((services) =>
      services.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredOrdered = filterByRange(ordenation, filtered);
    setFilteredServices(filteredOrdered);
  }, [services, filterByRange, ordenation, searchValue]);

  const handleSaveSelectedServices = () => {
    const selected = services
      .filter((service) => selectedServices.includes(service.id))
      .map((service) => ({
        ...service,
        quantity: 1,
        total: service.price,
        // TODO: fix this - category is no used in the model
        category: service.category || "",
      }));

    console.log("SELECTED", selected);
    addServices(selected);
    setSelectedAll(false);
    handleDisselectAll();
  };

  useEffect(() => {
    if (selectedAll) {
      handleSelectAll();
      return;
    }

    handleDisselectAll();
  }, [selectedAll, handleSelectAll, handleDisselectAll]);

  useEffect(handleSearch, [searchValue, handleSearch]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await ServiceRepository.findAll();
      setServices(response);
      setFilteredServices(response);
      return;
    };

    fetchServices();
  }, [ServiceRepository]);

  return (
    <section className="overflow-scroll">
      <CardHeader>
        <h3>Lista de serviços</h3>
        <CardDescription>
          Adicione os serviços prestados para o orçamento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-row gap-4 "
        >
          <div className="flex flex-col gap-1 w-1/3 ">
            <Input
              className="h-8"
              id="service-search"
              placeholder="Pesquisar"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
        </form>
        <div className="h-[400px] overflow-scroll py-4">
          <Table className="overflow-y-scroll">
            <TableHeader className="">
              <TableRow>
                <TableCell className="py-0">
                  <div className="flex flex-row gap-2 items-center">
                    <Checkbox
                      checked={selectedAll}
                      onCheckedChange={(checked) =>
                        setSelectedAll(checked === true)
                      }
                    />
                    Serviços
                  </div>
                </TableCell>
                <TableCell className="p-0">
                  <Popover
                    onOpenChange={setOpenTablePopover}
                    open={openTablePopover}
                  >
                    <PopoverTrigger asChild>
                      <Button className="" variant="ghost">
                        Preço {getOdernationIcon()}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col gap-2 bg-white w-32 p-2 rounded-md shadow-md">
                      <Button
                        type="button"
                        className=" text-xs"
                        variant="ghost"
                        size="sm"
                        onClick={() => changeOrdenation("asc")}
                      >
                        Asc <ArrowUp size={16} />
                      </Button>
                      <Button
                        type="button"
                        className=" text-xs"
                        variant="ghost"
                        size="sm"
                        onClick={() => changeOrdenation("desc")}
                      >
                        Desc <ArrowDown size={16} />{" "}
                      </Button>
                      <Separator className="h-[1px] bg-gray-100" />
                      <Button
                        type="button"
                        className=" text-xs"
                        variant="ghost"
                        size="sm"
                        onClick={() => changeOrdenation("default")}
                      >
                        Normal <ArrowUpDown size={16} />
                      </Button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="py-2">
                    <div className="flex flex-row gap-2 items-center">
                      <Checkbox
                        id={service.name + service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleSelectService(service.id)}
                      />
                      <Label htmlFor={service.name + service.id}>
                        {service.name}
                      </Label>
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    {service.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardContent>
        <CardFooter className="p-0 py-6 flex justify-end">
          <Button
            type="button"
            onClick={handleSaveSelectedServices}
            className="flex flex-row gap-2"
          >
            <Plus size={16} />
            Adicionar
          </Button>
        </CardFooter>
      </CardContent>
    </section>
  );
}
