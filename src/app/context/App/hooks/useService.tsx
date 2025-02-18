import { useContext } from "react";
import { AppContext } from "../AppContext";
import { ServiceActionTypes, ServiceType } from "../Services/types";

export default function useService() {
  const { serviceState, dispatchService } = useContext(AppContext);

  const addService = (service: ServiceType) => {
    dispatchService({
      type: ServiceActionTypes.ADD_SERVICE,
      payload: service,
    });
  };

  const addServices = (services: ServiceType[]) => {
    dispatchService({
      type: ServiceActionTypes.ADD_SERVICES,
      payload: { services },
    });
  };

  const removeService = (id: string) => {
    dispatchService({
      type: ServiceActionTypes.REMOVE_SERVICE,
      payload: { id },
    });
  };

  const updateServiceQuantity = (service: ServiceType) => {
    dispatchService({
      type: ServiceActionTypes.UPDATE_SERVICE_QUANTITY,
      payload: service,
    });
  };

  const updateServicePrice = (service: ServiceType) => {
    dispatchService({
      type: ServiceActionTypes.UPDATE_SERVICE_PRICE,
      payload: service,
    });
  };

  const clearServices = () => {
    dispatchService({
      type: ServiceActionTypes.CLEAR_SERVICES,
      payload: { id: "" },
    });
  };

  return {
    addService,
    addServices,
    removeService,
    updateServiceQuantity,
    updateServicePrice,
    clearServices,
    serviceState,
  };
}
