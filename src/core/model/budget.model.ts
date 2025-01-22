import { PartBudgetModel } from "./material.model";
// import { ServiceBudgetModel } from "./service.model";

export type BudgetModel = {
  id: string;
  clientId: string; // client_id from client
  userId: string; // user_id from user
  parts: PartBudgetModel[];
  // services: ServiceBudgetModel[];
  total: number;
  date: Date;
  status: "pending" | "approved" | "rejected";
  paymentMethod: "credit" | "debit" | "cash";
  paymentStatus: "paid" | "pending";
  paymentDate: Date;
  commission: number;
  discount: number;
};

export type BudgetDTO = {
  clientId: string;
  userId: string;
  total: number;
  paymentMethod: "credit" | "debit" | "cash";
  commission: number;
  discount: number;
};
