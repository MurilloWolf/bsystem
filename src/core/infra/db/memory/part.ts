import { PartModel } from "@/core/model/part.model";
import IPartRepository from "@/core/repository/part.repository";
import part from "./mock/part.table";

export default class Part implements IPartRepository {
  private parts;

  public constructor(initialTableState?: PartModel[]) {
    this.parts = initialTableState || [...part];
  }

  public async create(part: PartModel) {
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

  public async update(part: PartModel) {
    const index = this.parts.findIndex((p) => p.id === part.id);
    this.parts[index] = part;
    return part;
  }

  public async delete(id: string) {
    this.parts = this.parts.filter((part) => part.id !== id);
    return true;
  }
}
