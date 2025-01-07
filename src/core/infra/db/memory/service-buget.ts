import { IServiceBudgetRepository } from "@/core/repository/service.repository";
import mockServiceBudget from "./mock/service-budget";
import {
  ServiceBudgetDTOCreate,
  ServiceBudgetModel,
} from "@/core/model/service.model";
import Service from "./service";

export default class ServiceBudget implements IServiceBudgetRepository {
  private serviceBudgets: ServiceBudgetModel[] = [];

  constructor(initialServiceBudgets?: ServiceBudgetModel[]) {
    this.serviceBudgets = initialServiceBudgets || [...mockServiceBudget];
  }

  async create(serviceBudget: ServiceBudgetDTOCreate) {
    const newServiceBudget = {
      ...serviceBudget,
      id: Math.random().toString(36).substr(2, 9),
    };

    const dbService = new Service();
    const serviceExist = await dbService.findById(serviceBudget.serviceId);

    const serviceBudgetExist = await this.findServicesByBudgetId(
      serviceBudget.budgetId
    );

    if (serviceBudgetExist.length > 0 || !serviceExist) return null;

    this.serviceBudgets.push(newServiceBudget);
    return newServiceBudget;
  }

  async update(serviceBudget: ServiceBudgetModel) {
    const index = this.serviceBudgets.findIndex(
      (sb) => sb.id === serviceBudget.id
    );
    if (index === -1) return null;
    this.serviceBudgets[index] = serviceBudget;
    return serviceBudget;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.serviceBudgets.findIndex((sb) => sb.id === id);
    if (index === -1) return false;
    this.serviceBudgets.splice(index, 1);
    return true;
  }

  async changeQuantity(id: string, quantity: number) {
    const index = this.serviceBudgets.findIndex((sb) => sb.id === id);
    if (index === -1) return null;
    this.serviceBudgets[index].quantity = quantity;
    return this.serviceBudgets[index];
  }

  public async findServicesByBudgetId(budgetId: string) {
    return this.serviceBudgets.filter((sb) => sb.budgetId === budgetId);
  }
}
