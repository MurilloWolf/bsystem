import UseCase from ".";
import { PartBudgetDTO } from "../model/material.model";
import IBudgetRepository from "../repository/budget.repository";
import { IPartBudgetRepository } from "../repository/material.repository";

export type CreateBudgetInput = {
  userId: string;
  clientId: string;
  parts: PartBudgetDTO[];
  total: number;
  status: "pending" | "approved" | "rejected";
  paymentMethod: "credit" | "debit" | "cash";
  paymentDate: Date;
  commission: number;
  discount: number;
};

export default class CreateBudget implements UseCase {
  private budgetRepository: IBudgetRepository;
  private partBudgetRepository: IPartBudgetRepository;

  constructor(
    budgetRepository: IBudgetRepository,
    partBudgetRepository: IPartBudgetRepository
  ) {
    this.partBudgetRepository = partBudgetRepository;
    this.budgetRepository = budgetRepository;
  }

  public async execute(input: CreateBudgetInput) {
    const { parts, ...budgetData } = input;
    const budget = await this.budgetRepository.create(budgetData);

    /**
     * THIS LOGIC SHOULD BE MOVED TO DB IMPLEMENTATION
     * BUDGET.CREATE SHOULD RECEIVE PARTS AS PARAMETER
     * AND CREATE PARTS IN THE SAME TRANSACTION
     */
    if (budget) {
      const promises = parts.map((part) => {
        return this.partBudgetRepository.create({
          budgetId: budget.id,
          partId: part.partId,
          quantity: part.quantity,
        });
      });

      const responses = await Promise.all(promises);

      // If any of the part creation fails, we should delete the budget and all parts
      const failed = responses.some((response) => response === null);
      if (failed) {
        await this.budgetRepository.delete(budget.id);
        await Promise.all(
          responses.map((response) => {
            if (response) {
              return this.partBudgetRepository.delete(response.id);
            }
          })
        );
        return null;
      }

      return budget;
    }

    return null;
  }
}
