export type PartModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string | null;
  priceRange: "normal" | "high" | string;
  image: string;
};

export type PartBudgetModel = {
  id: string;
  partId: string;
  budgetId: string;
  quantity: number;
};

export type PartBudgetDTO = {
  partId: string;
  quantity: number;
};

export type PartBudgetDTOCreate = {
  budgetId: string;
  partId: string;
  quantity: number;
};
