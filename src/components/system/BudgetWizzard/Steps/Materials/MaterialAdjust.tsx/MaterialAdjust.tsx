// import { useControllerContext } from "@/app/context/Controller";
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

import { useMaterials } from "@/app/context/App/hooks/useMaterial";
import { MaterialType } from "@/app/context/App/Materials/types";

export type MaterialAdjustProps = {
  nextStep: () => void;
};

export default function MaterialAdjust(props: MaterialAdjustProps) {
  const { nextStep } = props;

  const { updateMaterialQuantity, materialState, removeMaterial } =
    useMaterials();

  const [materialList, setMaterialList] = useState<MaterialType[]>([
    ...materialState,
  ]);
  const [openTablePopover, setOpenTablePopover] = useState(false);
  const [ordenation, setOrdenation] = useState("default");

  const removeItemFromList = (id: string) => {
    removeMaterial(id);
  };

  const changeQuantity = (id: string, quantity: number) => {
    const updatedMaterials = materialList.map((material) => {
      if (material.id === id) {
        return {
          ...material,
          quantity,
          total: material.price * quantity,
        };
      }
      return material;
    });

    setMaterialList(updatedMaterials);
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeQuantity(e.target.id, Number(e.target.value));
  };

  const handleSaveAndNext = () => {
    const modifiedMaterials = materialList.filter((material) => {
      const updatedMaterial = materialState.find(
        (item) => item.id === material.id
      );

      if (!updatedMaterial) {
        return false;
      }

      return updatedMaterial?.quantity !== material.quantity;
    });

    modifiedMaterials.forEach((material) => {
      console.log(material);
      updateMaterialQuantity(material);
    });

    nextStep();
  };

  const filterByRange = useCallback(
    (ordenation: string, data: MaterialType[]) => {
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
    const sortedMaterials = filterByRange(value, materialList);

    setMaterialList(sortedMaterials as MaterialType[]);
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
    setMaterialList([...materialState]);
  }, [materialState]);

  return (
    <section>
      <CardHeader>
        <h3>Ajuste a quantidade de material necessária</h3>
        <CardDescription>
          Recomendamos usar a lista de material até <strong>6.000kW</strong> de
          potência
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-y-scroll h-fit min-h-[400px]">
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableCell className="py-0">
                <div className="flex flex-row gap-2 items-center">Material</div>
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
              <TableCell className="py-0">Quantidade</TableCell>
              <TableCell className="py-0 ">Total</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materialList.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="py-2">
                  <div className="flex flex-row gap-2 items-center">
                    {material.name}
                  </div>
                </TableCell>
                <TableCell className="py-2">
                  {material.price.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                </TableCell>
                <TableCell className="py-2 flex flex-row items-center gap-2">
                  <Input
                    type="number"
                    className="w-16 h-6 pl-1"
                    id={material.id}
                    value={material.quantity}
                    onChange={handleChangeQuantity}
                    min={1}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-4 h-6"
                    onClick={() => removeItemFromList(material.id)}
                  >
                    <Trash2 size={12} className="stroke-red-600" />
                  </Button>
                </TableCell>
                <TableCell className="py-0 text-left">
                  {material.total.toLocaleString("pt-br", {
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
                  {materialList
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
        <CardFooter className="p-0 py-6 flex justify-end">
          <Button
            type="button"
            onClick={handleSaveAndNext}
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
