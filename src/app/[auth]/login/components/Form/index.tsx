import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import LoadingButton from "../LoadingButton/LoadingButton";
import { useState, useTransition } from "react";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import FormStatus from "../FormStatus/FormStatus";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const [isDisabled, setIsDisabled] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const zodForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleServerSubmit = async (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      console.log(values);
      setIsDisabled(true);
      setError("");
      setSuccess("");
    });
  };

  return (
    <Form {...zodForm}>
      <form
        className="h-full min-h-[320px] max-h-[350px] flex justify-evenly items-center flex-col w-full max-w-[384px]"
        onSubmit={zodForm.handleSubmit(handleServerSubmit)}
      >
        <FormField
          control={zodForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  disabled={isDisabled}
                  placeholder="example@gmail.com"
                />
              </FormControl>
              <FormMessage className="font-extralight" />
            </FormItem>
          )}
        />
        <FormField
          control={zodForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="password">Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  disabled={isDisabled}
                  placeholder="******"
                />
              </FormControl>
              <FormMessage className="font-extralight" />
            </FormItem>
          )}
        />
        <FormStatus
          status={error ? "error" : "success"}
          message={error || success}
        />
        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full max-w-[384px]  gap-y-2"
          disabled={isDisabled}
        >
          Entrar
        </LoadingButton>
      </form>
    </Form>
  );
}
