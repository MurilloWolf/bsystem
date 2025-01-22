export type MaterialModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string | null;
  powerRange: "low" | "normal" | "high" | string;
  image: string;
};

export type MaterialBudgetModel = {
  id: string;
  materialId: string;
  budgetId: string;
  quantity: number;
};

export type MaterialBudgetDTO = {
  materialId: string;
  quantity: number;
};

export type MaterialBudgetDTOCreate = {
  budgetId: string;
  materialId: string;
  quantity: number;
};
