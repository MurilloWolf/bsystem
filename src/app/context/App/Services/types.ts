export type ServiceType = {
  id: string;
  name: string;
  total: number;
  price: number;
  quantity: number;
  description: string;
};

export enum ServiceActionTypes {
  ADD_SERVICE = "ADD_SERVICE",
  ADD_SERVICES = "ADD_SERVICES",
  REMOVE_SERVICE = "REMOVE_SERVICE",
  UPDATE_SERVICE_QUANTITY = "UPDATE_SERVICE_QUANTITY",
  UPDATE_SERVICE_PRICE = "UPDATE_SERVICE_PRICE",
  CLEAR_SERVICES = "CLEAR_SERVICES",
}

export type ServicePayload =
  | { services: ServiceType[] }
  | { id: string }
  | ServiceType;

export type ServiceAction = {
  type: ServiceActionTypes;
  payload: ServicePayload;
};
