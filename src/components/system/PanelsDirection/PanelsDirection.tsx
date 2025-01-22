import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import { Separator } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";
import PanelsAnglesTemplate from "./PanelsAnglesTemplate";

interface PanelDirectionRowProps {
  index: number;
  zodForm: any;
}

const PanelDirectionRow = (props: PanelDirectionRowProps) => {
  const { index, zodForm } = props;
  const directions = [
    "N",
    "NE ou NO",
    "NNE ou NNO",
    "ENE ou ONO",
    "E ou O",
    "ESE ou OSO",
    "SE ou SO",
    "SSE ou SSO",
    "S",
  ];

  const angles = [
    "0°",
    "5°",
    "10°",
    "15°",
    "20°",
    "25°",
    "30°",
    "35°",
    "40°",
    "45°",
    "50°",
    "55°",
    "60°",
    "65°",
    "70°",
    "75°",
    "80°",
    "85°",
    "90°",
  ];
  return (
    <TableRow>
      <TableCell className="p-0 text-center w-20">{index + 1}</TableCell>
      <TableCell className="p-0">
        <FormField
          control={zodForm.control}
          name=""
          render={({ field }) => (
            <FormItem className="w-[135px] md:text-xs m-2  p-0">
              <Select onValueChange={() => {}} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {directions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </TableCell>

      <TableCell className="p-0">
        <FormField
          control={zodForm.control}
          name=""
          render={({ field }) => (
            <FormItem className="w-full max-w-[80px] md:text-xs m-2 mx-4 ">
              <Input {...field} type="number" placeholder="0" />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-0">
        <FormField
          control={zodForm.control}
          name=""
          render={({ field }) => (
            <FormItem className="p-0 md:text-xs m-2 ">
              <Select onValueChange={() => {}} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {angles.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="p-0">
        <FormField
          control={zodForm.control}
          name=""
          render={({ field }) => (
            <FormItem className="w-full max-w-[80px] md:text-xs m-2 mx-4 ">
              <Input {...field} type="number" placeholder="0%" />
            </FormItem>
          )}
        />
      </TableCell>
    </TableRow>
  );
};

type PanelsDirectionsProps = {
  nextStep: () => void;
};

export default function PanelsDirections(props: PanelsDirectionsProps) {
  const { nextStep } = props;
  const zodForm = useForm();
  const dash = [
    {
      title: "Placas",
      value: "10",
    },
    {
      title: "Prod. Média",
      value: "400kW",
    },
    {
      title: "Potência",
      value: "18.000 kWp",
    },
    {
      title: "Telhado",
      value: "12,0 kW",
    },
    {
      title: "Solo",
      value: "14,0 kW",
    },
  ];
  const fields = new Array(4).fill(0);

  const handleSave = zodForm.handleSubmit((data) => {
    console.log(data);
    nextStep();
  });
  return (
    <div>
      <CardHeader className="text-md">
        <strong>Produção</strong>
      </CardHeader>
      <CardContent className="flex flex-row gap-4">
        {dash.map((item) => (
          <Card key={item.title} className="w-1/4">
            <CardHeader className="text-lg text-center p-2 px-4">
              <h4 className="font-normal text-xs text-gray-600">
                {item.title}
              </h4>
              <h3 className="text-center font-semibold text-xl text-green-500">
                {item.value}
              </h3>
            </CardHeader>
          </Card>
        ))}
      </CardContent>
      {/* <Separator className="my-4 w-full bg-border h-[1px]" /> */}
      <div className="flex flex-col justify-evenly h-full gap-12">
        <div>
          <CardHeader className="text-md flex flex-row items-center gap-2">
            <strong>Direção dos painéis</strong>
            <PanelsAnglesTemplate />
          </CardHeader>
          <CardContent>
            <Form {...zodForm}>
              <form>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">String</TableHead>
                      <TableHead>Direção</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Inclinação</TableHead>
                      <TableHead>Sombreamento</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((_, index) => (
                      <PanelDirectionRow
                        key={index}
                        zodForm={zodForm}
                        index={index}
                      />
                    ))}
                  </TableBody>
                </Table>
              </form>
            </Form>
          </CardContent>
        </div>
        <CardFooter>
          <div className="flex flex-row justify-between w-full">
            <Button type="button" className="w-1/3" variant="outline">
              Cancelar
            </Button>
            <Button type="button" className="w-1/3" onClick={handleSave}>
              Salvar
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
}
