import { PartBudgetDTOCreate, PartBudgetModel } from "@/core/model/part.model";
import { IPartBudgetRepository } from "@/core/repository/part.repository";
import Part from "./part";
import mockPartBudget from "./mock/part-budget.table";

export default class PartBudget implements IPartBudgetRepository {
  private partBudgets;
  public constructor(initialTableState?: PartBudgetModel[]) {
    this.partBudgets = initialTableState || [...mockPartBudget];
  }

  public async create(partBudget: PartBudgetDTOCreate) {
    const newPartBudget: PartBudgetModel = {
      ...partBudget,
      id: Math.random().toString(36).substr(2, 9),
    };
    const dbPart = new Part();

    const partExist = await dbPart.findById(partBudget.partId);
    const partBudgetExist = await this.findPartsByBudgetId(partBudget.budgetId);

    if (partBudgetExist.length > 0 || !partExist) {
      return null;
    }
    this.partBudgets.push(newPartBudget);
    return newPartBudget;
  }

  public async update(partBudget: PartBudgetModel) {
    const index = this.partBudgets.findIndex((p) => p.id === partBudget.id);
    this.partBudgets[index] = partBudget;
    return partBudget;
  }

  public async delete(id: string) {
    const index = this.partBudgets.findIndex(
      (partBudget) => partBudget.id === id
    );
    if (index === -1) {
      return false;
    }
    this.partBudgets.splice(index, 1);
    return true;
  }

  public async changeQuantity(id: string, quantity: number) {
    const partBudget = await this.findById(id);
    if (!partBudget) {
      return null;
    }
    partBudget.quantity = quantity;
    return partBudget;
  }

  public async findById(id: string) {
    const partBudget = this.partBudgets.find(
      (partBudget) => partBudget.id === id
    );
    return partBudget || null;
  }

  public async findPartsByBudgetId(budgetId: string) {
    const partBudget = this.partBudgets.filter(
      (part) => part.budgetId === budgetId
    );
    return partBudget;
  }
}
