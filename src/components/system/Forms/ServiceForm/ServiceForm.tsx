import {
  Button,
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
} from "@/components/ui";
import { LoadingButton } from "@/components/system";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ServiceFormDefaultValues, ServiceFormSchema } from "./schema";
import { useEffect, useState, useTransition } from "react";
import { Pencil, Plus } from "lucide-react";

type ServiceFormProps = {
  edit?: boolean;
  service?: {
    id: string;
    name: string;
    price: number;
    description: string;
  };
  iconOnly?: boolean;
  buttonSize?: "sm" | "md" | "lg";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
};

export default function ServiceForm(props: ServiceFormProps) {
  const { edit, iconOnly, variant, service } = props;
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(true);

  const defaultValue = edit && service ? service : ServiceFormDefaultValues;
  const zodForm = useForm({
    defaultValues: defaultValue,
    resolver: zodResolver(ServiceFormSchema),
  });

  const SheetTriggerContent = () => {
    const icons = {
      edit: <Pencil />,
      add: <Plus />,
    };

    if (iconOnly) {
      return icons[edit ? "edit" : "add"];
    }

    return edit ? "Editar serviço" : "Novo serviço";
  };

  const handleSubmit = zodForm.handleSubmit(async (data) => {
    startTransition(() => {
      console.log("zodform", data);
      setDisabled(false);
    });
  });

  const handleCancel = () => {
    console.log(zodForm.formState);
    setOpen(false);
  };

  useEffect(() => {
    setDisabled(!zodForm.formState.isDirty);
  }, [zodForm.formState.isDirty]);

  return (
    <section>
      <Sheet open={open} onOpenChange={(value) => setOpen(value)}>
        <SheetTrigger asChild>
          <Button variant={variant} className={iconOnly ? "w-4 h-6" : ""}>
            <SheetTriggerContent />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="py-2">
            <SheetTitle>{edit ? "Editar serviço" : "Novo serviço"}</SheetTitle>
          </SheetHeader>
          <Form {...zodForm}>
            <form className="flex flex-col gap-4 py-4">
              <FormField
                key="name"
                control={zodForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <Input
                          className="h-8 w-full max-w-[350px]"
                          {...field}
                          value={field.value}
                          id="name"
                          type="text"
                          placeholder=""
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-extralight" />
                  </FormItem>
                )}
              />
              <FormField
                key="description"
                control={zodForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <Input
                          className="h-8 w-full max-w-[350px]"
                          {...field}
                          id="description"
                          type="text"
                          placeholder=""
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-extralight" />
                  </FormItem>
                )}
              />
              <FormField
                key="price"
                control={zodForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="price">Preço</FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-2 justify-center items-center">
                        <Input
                          className="h-8 w-full max-w-[350px]"
                          {...field}
                          id="price"
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-extralight" />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-between gap-4 w-full py-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  type="button"
                  className="w-full max-w-[150px]"
                >
                  Cancelar
                </Button>
                <LoadingButton
                  isLoading={isPending}
                  disabled={isPending || disabled}
                  type="button"
                  className="w-full max-w-[150px]"
                  onClick={handleSubmit}
                  text="Salvar"
                />
              </div>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
