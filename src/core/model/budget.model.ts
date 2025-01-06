import { PartBudgetModel } from "./part.model";
import { ServiceBudgetModel } from "./service.model";

export type BudgetModel = {
  id: string;
  client_id: string; // client_id from client
  user_id: string; // user_id from user
  parts: PartBudgetModel[];
  services: ServiceBudgetModel[];
};
