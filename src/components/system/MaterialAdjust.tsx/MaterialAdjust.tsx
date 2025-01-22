import { useControllerContext } from "@/app/context/Controller";
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  Popover,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Checkbox,
  CardFooter,
} from "@/components/ui";
import { MaterialModel } from "@/core/model/material.model";
import { PopoverContent } from "@radix-ui/react-popover";
import { ArrowDown, ArrowUp, ArrowUpDown, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function MaterialAdjust() {
  const { MaterialRepository } = useControllerContext();
  const [materialsRange, setMaterialsRange] = useState("low");
  const [openTablePopover, setOpenTablePopover] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [search, setSearch] = useState("");
  const [ordenation, setOrdenation] = useState("default");
  const [materials, setMaterials] = useState<MaterialModel[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialModel[]>(
    []
  );
  const [searchValue] = useDebounce(search, 800);

  const handleSelectMaterial = (id: string) => {
    const isSelected = selectedMaterials.includes(id);

    if (isSelected) {
      setSelectedMaterials((prev) =>
        prev.filter((material) => material !== id)
      );
      return;
    }
    setSelectedMaterials((prev) => [...prev, id]);
  };

  const handleSelectAll = useCallback(() => {
    const allMaterials = materials.map((material) => material.id);
    setSelectedMaterials(allMaterials);
  }, [materials]);

  const handleDisselectAll = useCallback(() => {
    setSelectedMaterials([]);
  }, []);

  const filterByRange = useCallback(
    (ordenation: string, range: string, data: MaterialModel[]) => {
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
    const sortedMaterials = filterByRange(value, materialsRange, materials);

    setFilteredMaterials(sortedMaterials);
    setOpenTablePopover(false);
  };

  const changeMaterialsRange = (range: string) => {
    setMaterialsRange(range);

    const filtered = filteredMaterials.filter(
      (material) => material.powerRange === range
    );
    setFilteredMaterials(filtered);
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
    const filtered = materials.filter((material) =>
      material.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const filteredByPower =
      materialsRange === "all"
        ? [...filtered]
        : filtered.filter((material) => material.powerRange === materialsRange);

    const filteredOrdered = filterByRange(
      ordenation,
      materialsRange,
      filteredByPower
    );
    setFilteredMaterials(filteredOrdered);
  }, [materials, filterByRange, ordenation, materialsRange, searchValue]);

  useEffect(() => {
    if (selectedAll) {
      handleSelectAll();
      return;
    }

    handleDisselectAll();
  }, [selectedAll, handleSelectAll, handleDisselectAll]);

  useEffect(handleSearch, [searchValue, handleSearch]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const materials = await MaterialRepository.findAll();

      setMaterials(materials);
      setFilteredMaterials(materials);
      return;
    };

    fetchMaterials();
  }, [MaterialRepository]);

  return (
    <section className="overflow-scroll">
      <CardHeader>
        <h3>Lista de materiais</h3>
        <CardDescription>
          Recomendamos usar a lista de material até <strong>6.000kW</strong> de
          potência
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
              id="material-search"
              placeholder="Parafuso 8mm"
              value={search}
              onChange={handleChangeSearch}
            />
          </div>
          <Select
            onValueChange={changeMaterialsRange}
            defaultValue={materialsRange}
          >
            <div className="flex flex-col gap-1 w-1/3 ">
              <SelectTrigger id="system-power" className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{`Tudo`}</SelectItem>
                <SelectItem value="low">{`0 > 6.000kW`}</SelectItem>
                <SelectItem value="medium">{`7.000kW - 10.000kW`}</SelectItem>
                <SelectItem value="high">{`10.000kW > `}</SelectItem>
              </SelectContent>
            </div>
          </Select>
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
                    Material
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
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="py-2">
                    <div className="flex flex-row gap-2 items-center">
                      <Checkbox
                        checked={selectedMaterials.includes(material.id)}
                        onCheckedChange={() =>
                          handleSelectMaterial(material.id)
                        }
                      />
                      {material.name}
                    </div>
                  </TableCell>
                  <TableCell className="py-2">
                    {material.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <CardFooter className="p-0 py-6 flex justify-end">
          <Button
            type="button"
            onClick={handleDisselectAll}
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
