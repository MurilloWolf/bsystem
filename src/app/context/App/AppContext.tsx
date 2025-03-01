import { createContext, useReducer } from "react";

import MaterialReducer, { materialInitialState } from "./Materials/Materials";
import ServiceReducer, { serviceInitialState } from "./Services/Services";

import { MaterialAction, MaterialType } from "./Materials/types";
import { ServiceAction, ServiceType } from "./Services/types";
import RadiationReducer, { radiationInitialState } from "./Radiation/Radiation";
import { RadiationAction, RadiationType } from "./Radiation/types";

export type AppContextType = {
  radiation: RadiationType;
  dispatchRadiation: React.Dispatch<RadiationAction>;
  materialState: MaterialType[];
  dispatchMaterial: React.Dispatch<MaterialAction>;
  serviceState: ServiceType[];
  dispatchService: React.Dispatch<ServiceAction>;
};

export const AppContext = createContext<AppContextType>({
  radiation: null,
  dispatchRadiation: () => undefined,
  materialState: materialInitialState,
  dispatchMaterial: () => undefined,
  serviceState: serviceInitialState,
  dispatchService: () => undefined,
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props;
  const [materialState, dispatchMaterial] = useReducer(
    MaterialReducer,
    materialInitialState
  );

  const [serviceState, dispatchService] = useReducer(
    ServiceReducer,
    serviceInitialState
  );

  const [radiation, dispatchRadiation] = useReducer(
    RadiationReducer,
    radiationInitialState
  );

  const contextValue = {
    radiation,
    materialState,
    serviceState,
    dispatchMaterial,
    dispatchService,
    dispatchRadiation,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
