import {
  ServiceBudgetDTOCreate,
  ServiceBudgetModel,
  ServiceModel,
} from "../model/service.model";

export default interface IServiceRepository {
  create(service: ServiceModel): Promise<ServiceModel | null>;
  findAll(): Promise<ServiceModel[]>;
  findById(id: string): Promise<ServiceModel | null>;
  findByCategory(category: string): Promise<ServiceModel[]>;
  findByName(name: string): Promise<ServiceModel | null>;
  getAllCategories(): Promise<string[]>;
  update(service: ServiceModel): Promise<ServiceModel | null>;
  delete(id: string): Promise<boolean>;
}

export interface IServiceBudgetRepository {
  create(
    serviceBudget: ServiceBudgetDTOCreate
  ): Promise<ServiceBudgetModel | null>;
  update(serviceBudget: ServiceBudgetModel): Promise<ServiceBudgetModel | null>;
  delete(id: string): Promise<boolean>;
  changeQuantity(
    id: string,
    quantity: number
  ): Promise<ServiceBudgetModel | null>;
  findServicesByBudgetId(budgetId: string): Promise<ServiceBudgetModel[]>;
}
