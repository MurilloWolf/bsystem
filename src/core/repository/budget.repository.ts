import { BudgetDTO, BudgetModel } from "../model/budget.model";

export default interface IBudgetRepository {
  create(newBudget: BudgetDTO): Promise<BudgetModel | null>;
  findAll(): Promise<BudgetModel[]>;
  findById(id: string): Promise<BudgetModel | null>;
  findByUserId(userId: string): Promise<BudgetModel[]>;
  findByClientId(clientId: string): Promise<BudgetModel[]>;
  update(updateBudget: BudgetModel): Promise<BudgetModel>;
  delete(id: string): Promise<boolean>;
}
