import {
  MaterialBudgetDTOCreate,
  MaterialBudgetModel,
  MaterialModel,
} from "../model/material.model";

export default interface IMaterialRepository {
  create(part: MaterialModel): Promise<MaterialModel | null>;
  findAll(): Promise<MaterialModel[]>;
  findById(id: string): Promise<MaterialModel | null>;
  findAllByCategory(category: string): Promise<MaterialModel[]>;
  getAllCategories(): Promise<string[]>;
  findByName(name: string): Promise<MaterialModel | null>;
  findByCategory(category: string): Promise<MaterialModel[]>;
  update(part: MaterialModel): Promise<MaterialModel>;
  delete(id: string): Promise<boolean>;
}

export interface IPartBudgetRepository {
  create(
    PartBudget: MaterialBudgetDTOCreate
  ): Promise<MaterialBudgetModel | null>;
  update(PartBudget: MaterialBudgetModel): Promise<MaterialBudgetModel>;
  delete(id: string): Promise<boolean>;
  changeQuantity(
    id: string,
    quantity: number
  ): Promise<MaterialBudgetModel | null>;
  findPartsByBudgetId(budgetId: string): Promise<MaterialBudgetModel[]>;
}
