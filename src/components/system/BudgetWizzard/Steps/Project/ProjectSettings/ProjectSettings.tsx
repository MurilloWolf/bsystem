import {
  CardContent,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import {
  ProjectFormDefaultValues,
  ProjectSchema,
} from "./schemas/ProjectFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useControllerContext } from "@/app/context/Controller";
import { useEffect, useState } from "react";
import { ModuleModel } from "@/core/model/modules.model";
import { PanelModel } from "@/core/model/panel.model";
import { X } from "lucide-react";

export default function ProjectSettings() {
  const { ModulesRepository, PanelsRepository } = useControllerContext();

  const [modules, setModules] = useState<ModuleModel[]>([]);
  const [panels, setPanels] = useState<PanelModel[]>([]);

  const [filteredModules, setFilteredModules] = useState<ModuleModel[]>([]);
  const [filteredPanels, setFilteredPanels] = useState<PanelModel[]>([]);

  const [modulesProducers, setModulesProducers] = useState<string[]>([]);
  const [panelsProducers, setPanelsProducers] = useState<string[]>([]);

  const zodForm = useForm({
    resolver: zodResolver(ProjectSchema),
    defaultValues: ProjectFormDefaultValues,
  });

  const ModuleFilters = {
    producer: (producer: string, data: ModuleModel[]) => {
      return data.filter(
        (item) => item.producer === "Todos" || item.producer === producer
      );
    },
  };

  const PanelsFilters = {
    producer: (producer: string, data: PanelModel[]) => {
      return data.filter(
        (item) => item.producer === "Todos" || item.producer === producer
      );
    },
  };

  const handleFilterModules = (comparission: string, value: string) => {
    if (comparission === "module.producer") {
      const filteredModulesByProducer = ModuleFilters.producer(value, modules);

      setFilteredModules(filteredModulesByProducer);
      zodForm.setValue("module.producer", value);
      zodForm.setValue("module.model", "");
    }
  };

  const handleFilterPanels = (comparission: string, value: string) => {
    if (comparission === "panel.producer") {
      const filteredPanelsByProducer = PanelsFilters.producer(value, panels);

      setFilteredPanels(filteredPanelsByProducer);
      zodForm.setValue("panel.producer", value);
      zodForm.setValue("panel.model", "");
    }
  };

  useEffect(() => {
    const fetchModules = async () => {
      const response = await ModulesRepository.findAll();
      if (response) {
        const producersNames = response.map((item) => item.producer);
        setModulesProducers([...new Set(producersNames), "Todos"]);

        setFilteredModules(response);
        setModules(response);
        return;
      }

      setModules([]);
    };

    const fetchPanels = async () => {
      const response = await PanelsRepository.findAll();
      if (response) {
        const producersNames = response.map((panel) => panel.producer);
        setPanelsProducers([...new Set(producersNames), "Todos"]);

        setFilteredPanels(response);
        setPanels(response);
        return;
      }

      setPanels([]);
    };

    fetchPanels();
    fetchModules();
  }, [ModulesRepository, PanelsRepository]);

  return (
    <section>
      <CardHeader className="text-xl flex flex-row justify-between px-4">
        Projeto <X className="cursor-pointer" />
      </CardHeader>
      <CardContent className="p-0">
        <Form {...zodForm}>
          <h4 className="px-4">
            <strong>Módulo</strong>
          </h4>
          <div className="flex flex-row">
            <FormField
              control={zodForm.control}
              name="module.producer"
              render={({ field }) => (
                <FormItem className="w-full max-w-[135px] md:text-xs m-4 ">
                  <FormLabel className="">Fabricante</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      handleFilterModules("module.producer", value)
                    }
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {modulesProducers.map((producer) => (
                        <SelectItem key={producer} value={producer}>
                          {producer}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={zodForm.control}
              name="module.model"
              render={({ field }) => (
                <FormItem className="w-full max-w-[384px] md:text-xs m-4 ">
                  <FormLabel className="">Modulo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredModules.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={zodForm.control}
            name="module.systemType"
            render={({ field }) => (
              <FormItem className="w-full max-w-[135px] text-xs m-4 py-1 ">
                <RadioGroup
                  defaultValue={field.value}
                  className="flex flex-row gap-4 text-xs"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="roof" id="roof" />
                    <Label htmlFor="roof">Telhado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="solo" id="solo" />
                    <Label htmlFor="solo">Solo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="micro" id="micro" />
                    <Label htmlFor="micro">Micro/Otimizador</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
        </Form>
        <Separator
          orientation="horizontal"
          className="my-4 w-full bg-border h-[1px]"
        />
      </CardContent>
      <CardContent className="px-0">
        <h4 className="px-4">
          <strong>Inversor</strong>
        </h4>
        <Form {...zodForm}>
          <form>
            <div className="flex flex-row">
              <FormField
                control={zodForm.control}
                name="panel.producer"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[135px] md:text-xs m-4 ">
                    <FormLabel className="">Fabricante</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        handleFilterPanels("panel.producer", value)
                      }
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {panelsProducers.map((producer) => (
                          <SelectItem key={producer} value={producer}>
                            {producer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={zodForm.control}
                name="panel.model"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[400px] md:text-xs m-4 ">
                    <FormLabel className="">Modulo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredPanels.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={zodForm.control}
                name="panel.quantity"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[75px] md:text-xs m-4 ">
                    <FormLabel className="">Quantidade</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage className="font-extralight" />
                  </FormItem>
                )}
              />
              <FormField
                control={zodForm.control}
                name="panel.trafo"
                render={({ field }) => (
                  <FormItem className="w-full max-w-[80px] md:text-xs m-4 ">
                    <FormLabel className="">Trafo</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "Sim")}
                      defaultValue={field.value ? "Sim" : "Não"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sim">Sim</SelectItem>
                        <SelectItem value="Não">Não</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </section>
  );
}
