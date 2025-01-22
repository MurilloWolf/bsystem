import { MaterialModel } from "@/core/model/material.model";
import IMaterialRepository from "@/core/repository/material.repository";
import part from "./mock/material.table";

export default class Material implements IMaterialRepository {
  private parts;

  public constructor(initialTableState?: MaterialModel[]) {
    this.parts = initialTableState || [...part];
  }

  public async create(part: MaterialModel) {
    const nameExist = await this.findByName(part.name);
    if (nameExist) {
      return null;
    }
    this.parts.push(part);
    return part;
  }

  public async findAll() {
    return this.parts;
  }

  public async findById(id: string) {
    const part = this.parts.find((part) => part.id === id);
    return part || null;
  }

  public async findAllByCategory(category: string) {
    return this.parts.filter((part) => part.category === category);
  }

  public async getAllCategories() {
    const categories = this.parts
      .filter((part) => part.category !== null)
      .map((part) => part.category);

    return [...new Set(categories as string[])];
  }

  public async findByName(name: string) {
    const part = this.parts.find((part) => part.name === name);
    return part || null;
  }

  public async findByCategory(category: string) {
    return this.parts.filter((part) => part.category === category);
  }

  public async update(part: MaterialModel) {
    const index = this.parts.findIndex((p) => p.id === part.id);
    this.parts[index] = part;
    return part;
  }

  public async delete(id: string) {
    this.parts = this.parts.filter((part) => part.id !== id);
    return true;
  }
}
