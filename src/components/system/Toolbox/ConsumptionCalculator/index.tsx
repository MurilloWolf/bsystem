import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ConsumptionCalculatorSchema,
  ConsumptionCalculatorDefualtValues,
} from "./schema";
import { InfoIcon } from "lucide-react";

export default function ConsumptionCalculator() {
  const zodForm = useForm({
    defaultValues: ConsumptionCalculatorDefualtValues,
    resolver: zodResolver(ConsumptionCalculatorSchema),
  });

  const months = [
    { key: "january", translation: "Janeiro" },
    { key: "february", translation: "Fevereiro" },
    { key: "march", translation: "Março" },
    { key: "april", translation: "Abril" },
    { key: "may", translation: "Maio" },
    { key: "june", translation: "Junho" },
    { key: "july", translation: "Julho" },
    { key: "august", translation: "Agosto" },
    { key: "september", translation: "Setembro" },
    { key: "october", translation: "Outubro" },
    { key: "november", translation: "Novembro" },
    { key: "december", translation: "Dezembro" },
  ];

  const total = Object.values(zodForm.watch()).reduce(
    (acc, current) => Number(acc) + Number(current),
    0
  );

  return (
    <Card className="h-full">
      <CardHeader>
        <h1 className="text-xl flex flex-row items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon size={18} className="stroke-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Calculadora manual de consumo anual</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          Calculo médio de consumo
        </h1>
      </CardHeader>
      <CardContent>
        <Form {...zodForm}>
          <form className="p-4 flex flex-col items-center justify-center">
            {months.map((month, index) => (
              <FormField
                key={index}
                control={zodForm.control}
                name={
                  month.key as keyof typeof ConsumptionCalculatorDefualtValues
                }
                render={({ field }) => (
                  <FormItem className="w-[170px] flex flex-row items-center justify-between gap-4">
                    <FormLabel htmlFor={month.key}>
                      {month.translation.charAt(0).toUpperCase() +
                        month.translation.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-6 w-20"
                        {...field}
                        id={month.key}
                        type="number"
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage className="font-extralight" />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <strong>Total: {total}kWh</strong>
      </CardFooter>
    </Card>
  );
}
