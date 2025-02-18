import { useContext } from "react";
import { AppContext } from "../AppContext";
import { MaterialActionTypes, MaterialType } from "../Materials/types";

export function useMaterials() {
  const { materialState, dispatchMaterial } = useContext(AppContext);

  const addMaterial = (material: MaterialType) => {
    dispatchMaterial({
      type: MaterialActionTypes.ADD_MATERIAL,
      payload: material,
    });
  };

  const addMaterials = (materials: MaterialType[]) => {
    dispatchMaterial({
      type: MaterialActionTypes.ADD_MATERIALS,
      payload: { materials },
    });
  };

  const removeMaterial = (id: string) => {
    dispatchMaterial({
      type: MaterialActionTypes.REMOVE_MATERIAL,
      payload: { id },
    });
  };

  const updateMaterialQuantity = (material: MaterialType) => {
    dispatchMaterial({
      type: MaterialActionTypes.UPDATE_MATERIAL_QUANTITY,
      payload: material,
    });
  };

  const updateMaterialPrice = (material: MaterialType) => {
    dispatchMaterial({
      type: MaterialActionTypes.UPDATE_MATERIAL_PRICE,
      payload: material,
    });
  };

  const clearMaterials = () => {
    dispatchMaterial({
      type: MaterialActionTypes.CLEAR_MATERIALS,
      payload: { id: "" },
    });
  };

  return {
    addMaterial,
    addMaterials,
    removeMaterial,
    updateMaterialQuantity,
    updateMaterialPrice,
    clearMaterials,
    materialState,
  };
}
