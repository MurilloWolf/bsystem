import { useCallback, useContext, useEffect } from "react";
import { RadiationPerAngle } from "@/lib/PanelSetup/CalcRadiation/types";
import useLocationRadiation from "@/app/hooks/useLocationRadiation/useLocationRadiation";
import { Location } from "@/lib/PanelSetup/NasaRadiation/types";
import { RadiationActionTypes } from "../Radiation/types";
import { AppContext } from "../AppContext";

export default function useRadiation() {
  const { radiation, dispatchRadiation } = useContext(AppContext);
  const { fetchRadiationData, radiationPerAngle, error, isPending } =
    useLocationRadiation();

  const updateRadiation = useCallback(
    (radiation: RadiationPerAngle) => {
      dispatchRadiation({
        type: RadiationActionTypes.UPDATE_RADIATION,
        payload: radiation,
      });
    },
    [dispatchRadiation]
  );

  const fetchRadiation = (location: Location) => {
    fetchRadiationData(location);
  };

  useEffect(() => {
    if (radiationPerAngle) {
      updateRadiation(radiationPerAngle);
    }
  }, [radiationPerAngle, updateRadiation]);

  return {
    updateRadiation,
    radiation,
    error,
    isPending,
    fetchRadiation,
  };
}
