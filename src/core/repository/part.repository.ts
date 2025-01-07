import {
  PartBudgetDTOCreate,
  PartBudgetModel,
  PartModel,
} from "../model/part.model";

export default interface IPartRepository {
  create(part: PartModel): Promise<PartModel | null>;
  findAll(): Promise<PartModel[]>;
  findById(id: string): Promise<PartModel | null>;
  findAllByCategory(category: string): Promise<PartModel[]>;
  getAllCategories(): Promise<string[]>;
  findByName(name: string): Promise<PartModel | null>;
  findByCategory(category: string): Promise<PartModel[]>;
  update(part: PartModel): Promise<PartModel>;
  delete(id: string): Promise<boolean>;
}

export interface IPartBudgetRepository {
  create(PartBudget: PartBudgetDTOCreate): Promise<PartBudgetModel | null>;
  update(PartBudget: PartBudgetModel): Promise<PartBudgetModel>;
  delete(id: string): Promise<boolean>;
  changeQuantity(id: string, quantity: number): Promise<PartBudgetModel | null>;

  findPartsByBudgetId(budgetId: string): Promise<PartBudgetModel[]>;
}
