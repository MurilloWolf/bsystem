// import { useControllerContext } from "@/app/context/Controller";
import useService from "@/app/context/App/hooks/useService";
import { ServiceType } from "@/app/context/App/Services/types";
import { ServiceForm } from "@/components/system/Forms";
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
  CardFooter,
  TableFooter,
} from "@/components/ui";
import { PopoverContent } from "@radix-ui/react-popover";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpDown,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type ServicesAdjustProps = {
  nextStep: () => void;
};

export default function ServicesAdjust(props: ServicesAdjustProps) {
  const { nextStep } = props;
  const { serviceState, clearServices } = useService();
  const [openTablePopover, setOpenTablePopover] = useState(false);
  const [serviceList, setServiceList] = useState<ServiceType[]>([
    ...serviceState,
  ]);
  const [ordenation, setOrdenation] = useState("default");

  const removeItemFromList = (id: string) => {
    const updatedServices = serviceList.filter((service) => service.id !== id);
    setServiceList(updatedServices);
  };

  const changeQuantity = (id: string, quantity: number) => {
    const updatedServices = serviceList.map((service) => {
      if (service.id === id) {
        return {
          ...service,
          quantity,
          total: service.price * quantity,
        };
      }
      return service;
    });

    setServiceList(updatedServices);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeQuantity(e.target.id, Number(e.target.value));
  };

  const handleClear = () => {
    setServiceList([]);
    clearServices();
  };

  const filterByRange = useCallback(
    (ordenation: string, data: ServiceType[]) => {
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
    const sortedMaterials = filterByRange(value, serviceList);

    setServiceList(sortedMaterials);
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

  useEffect(() => {
    setServiceList(serviceState);
  }, [serviceState]);

  return (
    <section>
      <CardHeader>
        <h3>Ajuste os serviços prestados</h3>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll h-fit min-h-[400px]">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableCell className="py-0">
                <div className="flex flex-row gap-2 items-center">Material</div>
              </TableCell>
              <TableCell className="p-0 w-fit max-w-32">
                <Popover
                  onOpenChange={setOpenTablePopover}
                  open={openTablePopover}
                >
                  <PopoverTrigger asChild>
                    <Button variant="ghost">Preço {getOdernationIcon()}</Button>
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
              <TableCell className="py-0">Quantidade</TableCell>
              <TableCell className="py-0 ">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceList.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="py-2">
                  <div className="flex flex-row gap-2 items-center">
                    {service.name}
                  </div>
                </TableCell>
                <TableCell className="py-2 ">
                  <div className="flex flex-row items-center justify-around  w-full max-w-32">
                    {service.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    <ServiceForm
                      service={{ ...service }}
                      edit
                      iconOnly
                      variant="ghost"
                    />
                  </div>
                </TableCell>
                <TableCell className="py-2 flex flex-row items-center gap-2">
                  <Input
                    type="number"
                    className="w-16 h-6 pl-1"
                    value={service.quantity}
                    id={service.id}
                    onChange={handleChangeQuantity}
                    min={0}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-4 h-6"
                    onClick={() => removeItemFromList(service.id)}
                  >
                    <Trash2 size={12} className="stroke-red-600" />
                  </Button>
                </TableCell>
                <TableCell className="py-0 text-left">
                  {service.total.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardContent className="w-full p-4">
        <Table>
          <TableFooter className="p-4">
            <TableRow>
              <TableCell className="text-right text-md font-semibold">
                Total:
                <span className="text-lg px-4">
                  {serviceList
                    .reduce((acc, item) => acc + item.total, 0)
                    .toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>

      <CardContent>
        <CardFooter className="p-0 py-6 flex justify-between">
          <Button
            type="button"
            onClick={handleClear}
            className="flex fl  ex-row gap-2 min-w-32"
            variant="outline"
          >
            Limpar
          </Button>
          <Button
            type="button"
            onClick={nextStep}
            className="flex flex-row gap-2"
          >
            Próximo passo
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </CardContent>
    </section>
  );
}
