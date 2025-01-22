import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import {
  ClientFormDefaultValues,
  ClientFormSchema,
  fieldsTranslation,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import LoadingButton from "../LoadingButton/LoadingButton";
import InputLoading from "../InputLoading/InputLoading";
import useBudgetContext from "@/app/context/Budget/useBudgetContext";
import { useControllerContext } from "@/app/context/Controller";
import CreateClient from "@/core/use-cases/create-client";

export default function ClientForm() {
  const { selectClient } = useBudgetContext();
  const { ClientRepository } = useControllerContext();
  const [open, setOpen] = useState(false);
  const [isPendingZip, startTransitionZip] = useTransition();
  const [isPendingSave, startTransitionSave] = useTransition();

  const zodForm = useForm({
    defaultValues: ClientFormDefaultValues,
    resolver: zodResolver(ClientFormSchema),
  });

  const clearForm = () => {
    zodForm.reset();
  };

  const fetchZipCode = async (zipCode: string) => {
    startTransitionZip(async () => {
      const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
      const data = await response.json();
      if (data.uf && data.localidade) {
        zodForm.setValue("uf", data.uf);
        zodForm.setValue("city", data.localidade);
        zodForm.setValue("address", data.logradouro);
        zodForm.setValue("neighborhood", data.bairro);
      }
      return data;
    });
  };

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const zipCode = e.target.value;
    if (parseInt(zipCode) && zipCode.length === 8) {
      fetchZipCode(zipCode);
      zodForm.clearErrors("zip");
      return;
    }

    zodForm.setError("zip", { type: "manual", message: "CEP inválido" });
  };

  const formatUf = (e: React.ChangeEvent<HTMLInputElement>) => {
    return zodForm.setValue("uf", e.target.value.toUpperCase());
  };

  const calcMaxLenght = (field: string) => {
    const fields = {
      name: 255,
      email: 255,
      phone: 11,
      address: 255,
      city: 255,
      state: 2,
      zip: 8,
      neighborhood: 255,
      uf: 2,
    };
    return Number(fields[field as keyof typeof fields]);
  };

  const handleSave = zodForm.handleSubmit(({ zip, ...rest }) => {
    startTransitionSave(async () => {
      const payload = {
        ...rest,
        zipCode: zip,
        userId: "1",
        birthDate: new Date(),
        document: "12345678901",
      };
      const createClient = new CreateClient(ClientRepository);
      const response = await createClient.execute(payload);
      if (!response) return;

      setOpen(false);
      clearForm();
      selectClient(response);
    });
  });

  return (
    <section>
      <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger className="py-2 px-4 bg-black text-white hover:bg-gray-800 rounded-md text-md min-w-[150px]">
          Novo Cliente
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Novo cliente</SheetTitle>
          </SheetHeader>

          <Form {...zodForm}>
            <form className="flex flex-col gap-4 p-4 justify-center items-center">
              {fieldsTranslation.map(({ key, translation }) => {
                return (
                  <FormField
                    key={translation}
                    control={zodForm.control}
                    name={key as keyof typeof ClientFormDefaultValues}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel htmlFor={key}>{translation}</FormLabel>
                        <FormControl>
                          <div className="flex flex-row gap-2 justify-center items-center">
                            {key === "zip" ? (
                              <InputLoading
                                isLoading={isPendingZip}
                                className="h-8 w-full max-w-[350px]"
                                {...field}
                                id={key}
                                type="text"
                                placeholder=""
                                disabled={isPendingZip}
                                maxLength={calcMaxLenght(key)}
                                onChange={field.onChange}
                                onBlur={handleZipCodeChange}
                              />
                            ) : (
                              <Input
                                className="h-8 w-full max-w-[350px]"
                                {...field}
                                id={key}
                                type="text"
                                placeholder=""
                                disabled={isPendingZip}
                                maxLength={calcMaxLenght(key)}
                                onChange={
                                  key === "uf" ? formatUf : field.onChange
                                }
                                onBlur={
                                  key === "zip"
                                    ? handleZipCodeChange
                                    : field.onChange
                                }
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="font-extralight" />
                      </FormItem>
                    )}
                  />
                );
              })}
              <div className="flex flex-row gap-4 w-full">
                <LoadingButton
                  type="button"
                  className="w-full"
                  onClick={handleSave}
                  isLoading={isPendingSave}
                  text="Salvar"
                />
                <Button
                  type="button"
                  className="w-full"
                  variant="ghost"
                  onClick={clearForm}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
