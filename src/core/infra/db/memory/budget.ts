import { BudgetDTO, BudgetModel } from "@/core/model/budget.model";
import IBudgetRepository from "@/core/repository/budget.repository";

export default class Budget implements IBudgetRepository {
  private budgets: BudgetModel[] = [];

  async create(newBudgetDTO: BudgetDTO): Promise<BudgetModel | null> {
    const budget: BudgetModel = {
      ...newBudgetDTO,
      id: Math.random().toString(36).substr(2, 9),
      parts: [],
      total: 0,
      date: new Date(),
      status: "pending",
      paymentStatus: "pending",
      paymentDate: new Date(),
    };

    this.budgets.push(budget);
    return budget;
  }

  async findAll(): Promise<BudgetModel[]> {
    return this.budgets;
  }

  async findById(id: string): Promise<BudgetModel | null> {
    return this.budgets.find((budget) => budget.id === id) || null;
  }

  async findByUserId(userId: string): Promise<BudgetModel[]> {
    return this.budgets.filter((budget) => budget.userId === userId);
  }

  async findByClientId(clientId: string): Promise<BudgetModel[]> {
    return this.budgets.filter((budget) => budget.clientId === clientId);
  }

  async update(updateBudget: BudgetModel): Promise<BudgetModel> {
    const index = this.budgets.findIndex(
      (budget) => budget.id === updateBudget.id
    );
    this.budgets[index] = updateBudget;
    return updateBudget;
  }

  async delete(id: string): Promise<boolean> {
    this.budgets = this.budgets.filter((budget) => budget.id !== id);
    return true;
  }
}
