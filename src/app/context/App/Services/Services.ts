import { ServiceAction, ServiceActionTypes, ServiceType } from "./types";

export const serviceInitialState: ServiceType[] = [];

export default function ServiceReducer(
  state = serviceInitialState,
  action: ServiceAction
) {
  switch (action.type) {
    case ServiceActionTypes.ADD_SERVICE:
      if ("id" in action.payload && "name" in action.payload) {
        const serviceToAdd = action.payload as ServiceType;

        if (state.find((service) => service.id === serviceToAdd.id)) {
          return state.map((service) => {
            if (service.id === serviceToAdd.id) {
              return {
                ...service,
                quantity: service.quantity + 1,
                total: service.price * (service.quantity + 1),
              };
            }
            return service;
          });
        }
        return [...state, { ...action.payload }];
      }

      return state;

    case ServiceActionTypes.REMOVE_SERVICE:
      if ("id" in action.payload)
        return state.filter(
          (service) => service.id !== (action.payload as ServiceType).id
        );
      return state;

    case ServiceActionTypes.ADD_SERVICES:
      if ("services" in action.payload) {
        const servicesPayload = action.payload.services as ServiceType[];

        const servicesToUpdate = state.filter((service) =>
          servicesPayload.some((newService) => newService.id === service.id)
        );

        const servicesToAdd = servicesPayload.filter((service) =>
          servicesToUpdate.every((newService) => newService.id !== service.id)
        );

        let updatedServices: ServiceType[] = [];

        if (servicesToUpdate.length > 0) {
          updatedServices = state.map((service) => {
            const updatedService = servicesToUpdate.find(
              (newService) => newService.id === service.id
            );

            if (updatedService) {
              return {
                ...service,
                quantity: service.quantity + 1,
                total: service.price * (service.quantity + 1),
              };
            }
            return service;
          });
          return [...updatedServices, ...servicesToAdd];
        }
        return [...state, ...servicesToAdd];
      }

      return state;

    case ServiceActionTypes.UPDATE_SERVICE_QUANTITY:
      if ("id" in action.payload && "name" in action.payload) {
        return state.map((service) => {
          if (service.id === (action.payload as ServiceType).id) {
            return {
              ...service,
              quantity: (action.payload as ServiceType).quantity,
              total:
                (action.payload as ServiceType).price *
                (action.payload as ServiceType).quantity,
            };
          }
          return service;
        });
      }
      return state;

    case ServiceActionTypes.UPDATE_SERVICE_PRICE:
      if ("id" in action.payload && "name" in action.payload) {
        const payload = action.payload as ServiceType;
        return state.map((service) => {
          if (service.id === payload.id) {
            return {
              ...service,
              price: payload.price,
              total: payload.quantity * payload.price,
            };
          }
          return service;
        });
      }

    case ServiceActionTypes.CLEAR_SERVICES:
      return serviceInitialState;

    default:
      return state;
  }
}
