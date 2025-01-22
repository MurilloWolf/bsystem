import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MaterialFormSchema, MaterialFormDefaultValues } from "./schema";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useTransition } from "react";

export default function MaterialForm() {
  const zodForm = useForm({
    resolver: zodResolver(MaterialFormSchema),
    defaultValues: MaterialFormDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = zodForm.handleSubmit(async () => {
    startTransition(() => {});
  });

  return (
    <Form {...zodForm}>
      <form>
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
              <FormLabel htmlFor="description">Preço</FormLabel>
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
        <div className="flex flex-row gap-2 justify-center items-center">
          <LoadingButton
            type="button"
            isLoading={isPending}
            onClick={handleSubmit}
            text={"Salvar"}
          />
          <Button
            type="button"
            onClick={() => zodForm.reset()}
            className="ml-2"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Form>
  );
}
