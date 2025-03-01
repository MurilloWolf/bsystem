import { useCallback, useState, useTransition } from "react";
import fetchNasaDetails from "@/lib/PanelSetup/NasaRadiation/fetchNasaDetails";
import { ApiResponse, Location } from "@/lib/PanelSetup/NasaRadiation/types";
import calculateSolarRadiationPerAngle from "@/lib/PanelSetup/CalcRadiation/calculateSolarRadiationPerAngle";
import { RadiationPerAngle } from "@/lib/PanelSetup/CalcRadiation/types";
import radiationMock from "../../../../mock/radiation";

export default function useLocationRadiation() {
  const [radiationPerAngle, setRadiationPerAngle] =
    useState<RadiationPerAngle | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const fetchRadiationData = useCallback(async (location: Location) => {
    startTransition(async () => {
      setError(null);

      try {
        // const data = await fetchNasaDetails(location);
        // const radiationPerAngle = calculateSolarRadiationPerAngle(
        //   data as ApiResponse
        // );
        console.log("fetchRadiation", radiationPerAngle);
        // setRadiationPerAngle(radiationPerAngle);
        setRadiationPerAngle(radiationMock);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    });
  }, []);

  return { fetchRadiationData, isPending, error, radiationPerAngle };
}
