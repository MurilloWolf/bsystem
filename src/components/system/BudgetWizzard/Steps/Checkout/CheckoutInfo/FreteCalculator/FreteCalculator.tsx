import { Form, Button } from "@/components/ui";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import AddressAutoComplete from "@/components/system/AddressAutoComplete/AddressAutoComplete";
import { SuggestCity } from "@/lib/SuggestLocation/types";
import fetchDistanceDriving from "@/lib/DistanceBetweenCities/fetchDistanceDriving";
import LoadingButton from "@/components/system/LoadingButton/LoadingButton";

export default function FreteCalculator() {
  const zodForm = useForm({});
  const [origin, setOrigin] = useState<SuggestCity | null>(null);
  const [destination, setDestination] = useState<SuggestCity | null>(null);
  const [isPending, startTransition] = useTransition();
  const [distance, setDistance] = useState(0);

  const handleCalculateFrete = async () => {
    if (!origin || !destination) {
      return;
    }
    startTransition(async () => {
      setDistance(0);
      const response = await fetchDistanceDriving(
        origin.coordinates,
        destination.coordinates
      );
      setDistance(Math.round(response / 1000));
    });
  };

  const handleSave = () => {};

  return (
    <Form {...zodForm}>
      <form className="flex flex-col gap-4 w-72 min-h-72">
        <AddressAutoComplete
          label="Origem"
          placeHolder="Pesquisar"
          onSelect={(city) => setOrigin(city)}
        />
        <AddressAutoComplete
          label="Destino"
          placeHolder="Pesquisar"
          onSelect={(city) => setDestination(city)}
        />
        {distance > 0 ? (
          <p className="text-lg font-semibold">Distancia: {distance} km</p>
        ) : (
          <LoadingButton
            isLoading={isPending}
            onClick={handleCalculateFrete}
            type="button"
            text={"Calcular"}
          />
        )}
        {distance > 0 && (
          <div className="w-full flex flex-row justify-between py-12">
            <Button
              variant="outline"
              type="button"
              className="w-32"
              onClick={() => setDistance(0)}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleSave} className="w-32">
              Confirmar
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
