export type ServiceModel = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

export type ServiceBudgetModel = {
  id: string;
  serviceId: string;
  budgetId: string;
  quantity: number;
};

export type ServiceBudgetDTO = {
  serviceId: string;
  quantity: number;
};

export type ServiceBudgetDTOCreate = {
  budgetId: string;
  serviceId: string;
  quantity: number;
};
