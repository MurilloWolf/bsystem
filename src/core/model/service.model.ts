export type ServiceModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type ServiceBudgetModel = {
  id: string;
  service_id: string;
  budget_id: string;
};
