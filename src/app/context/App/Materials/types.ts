export type MaterialType = {
  id: string;
  name: string;
  total: number;
  price: number;
  image: string;
  quantity: number;
  category: string;
  powerRange: "low" | "medium" | "high" | string;
  description: string;
};

export enum MaterialActionTypes {
  ADD_MATERIAL = "ADD_MATERIAL",
  ADD_MATERIALS = "ADD_MATERIALS",
  REMOVE_MATERIAL = "REMOVE_MATERIAL",
  UPDATE_MATERIAL_QUANTITY = "UPDATE_MATERIAL_QUANTITY",
  UPDATE_MATERIAL_PRICE = "UPDATE_MATERIAL_PRICE",
  CLEAR_MATERIALS = "CLEAR_MATERIALS",
}

export type MaterialPayload =
  | { materials: MaterialType[] }
  | MaterialType
  | { id: string };

export type MaterialAction = {
  type: MaterialActionTypes;
  payload: MaterialPayload;
};
