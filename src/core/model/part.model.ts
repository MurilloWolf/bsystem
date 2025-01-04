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
  parts_id: string;
  budget_id: string;
  quantity: number;
};
