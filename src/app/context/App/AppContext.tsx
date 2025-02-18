import { createContext, useReducer } from "react";

import MaterialReducer, { materialInitialState } from "./Materials/Materials";
import ServiceReducer, { serviceInitialState } from "./Services/Services";

import { MaterialAction, MaterialType } from "./Materials/types";
import { ServiceAction, ServiceType } from "./Services/types";

export type AppContextType = {
  materialState: MaterialType[];
  dispatchMaterial: React.Dispatch<MaterialAction>;
  serviceState: ServiceType[];
  dispatchService: React.Dispatch<ServiceAction>;
};

export const AppContext = createContext<AppContextType>({
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

  const contextValue = {
    materialState,
    serviceState,
    dispatchMaterial,
    dispatchService,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
