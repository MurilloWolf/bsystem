import {
  Button,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import FreteCalculator from "./FreteCalculator/FreteCalculator";
import { useState } from "react";
import { PencilIcon } from "lucide-react";

export default function CheckoutInfo() {
  const [openFreteCalculator, setIsOpenFreteCalculator] = useState(false);
  const zodForm = useForm();

  const handleOpenFreteCalculator = () => {
    setIsOpenFreteCalculator(true);
  };

  return (
    <section>
      <CardHeader>
        <h3>Informações de Checkout</h3>
      </CardHeader>
      <CardContent>
        <Form {...zodForm}>
          <form>
            <div>
              <p>
                <strong>Endereço de entrega:{}</strong>
              </p>
              <Dialog
                open={openFreteCalculator}
                onOpenChange={setIsOpenFreteCalculator}
                modal={false}
              >
                <DialogTrigger asChild>
                  <Button type="button" onClick={handleOpenFreteCalculator}>
                    <PencilIcon size={16} className="mr-2" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-96 p-4 px-0 flex flex-col justify-center items-center">
                  <DialogHeader>
                    <DialogTitle>Calculo de frete</DialogTitle>
                  </DialogHeader>
                  <FreteCalculator />
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </CardContent>
    </section>
  );
}
