import { MaterialType, MaterialActionTypes, MaterialAction } from "./types";

export const materialInitialState: MaterialType[] = [];

export default function MaterialReducer(
  state = materialInitialState,
  action: MaterialAction
) {
  switch (action.type) {
    case MaterialActionTypes.ADD_MATERIAL:
      if ("id" in action.payload && "name" in action.payload) {
        if (
          state.find(
            (material) => material.id === (action.payload as MaterialType).id
          )
        ) {
          return state.map((material) => {
            if (material.id === (action.payload as MaterialType).id) {
              return {
                ...material,
                quantity: material.quantity + 1,
                total: material.price * (material.quantity + 1),
              };
            }
            return material;
          });
        }
        return [...state, { ...action.payload }];
      }

      return state;

    case MaterialActionTypes.REMOVE_MATERIAL:
      if ("id" in action.payload)
        return state.filter(
          (material) => material.id !== (action.payload as MaterialType).id
        );
      return state;

    case MaterialActionTypes.ADD_MATERIALS:
      if ("materials" in action.payload) {
        const materialsToAdd = action.payload.materials as MaterialType[];

        const materialsToUpdate = state.filter((material) =>
          materialsToAdd.some((newMaterial) => newMaterial.id === material.id)
        );

        if (materialsToUpdate.length > 0) {
          const updatedMaterials = state.map((material) => {
            const updatedMaterial = materialsToUpdate.find(
              (newMaterial) => newMaterial.id === material.id
            );

            if (updatedMaterial) {
              return {
                ...material,
                quantity: material.quantity + 1,
                total: material.price * (material.quantity + 1),
              };
            }

            return material;
          });

          const materialsWithoutUpdate = materialsToAdd.filter(
            (material) =>
              !materialsToUpdate.some(
                (updatedMaterial) => updatedMaterial.id === material.id
              )
          );
          return [...updatedMaterials, ...materialsWithoutUpdate];
        }

        return [...state, ...materialsToAdd];
      }

    case MaterialActionTypes.UPDATE_MATERIAL_QUANTITY:
      if ("id" in action.payload && "name" in action.payload) {
        const payload = action.payload as MaterialType;
        return state
          .filter(
            (material) => material.id === payload.id && payload.quantity > 0
          )
          .map((material) => {
            if (material.id === payload.id) {
              return {
                ...material,
                quantity: payload.quantity,
                total: payload.quantity * material.price,
              };
            }
            return material;
          });
      }
      return state;

    case MaterialActionTypes.UPDATE_MATERIAL_PRICE:
      if ("id" in action.payload && "name" in action.payload) {
        const payload = action.payload as MaterialType;
        return state.map((material) => {
          if (material.id === payload.id) {
            return {
              ...material,
              price: payload.price,
              total: payload.quantity * payload.price,
            };
          }
          return material;
        });
      }

    case MaterialActionTypes.CLEAR_MATERIALS:
      return materialInitialState;

    default:
      return state;
  }
}
