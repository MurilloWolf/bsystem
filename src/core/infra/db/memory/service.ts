import IServiceRepository from "../../../repository/service.repository";
import { ServiceModel } from "@/core/model/service.model";
import serviceMocked from "./mock/service.table";

export default class Service implements IServiceRepository {
  private services;

  public constructor(initialTableState?: ServiceModel[]) {
    this.services = initialTableState || [...serviceMocked];
  }

  public async create(service: ServiceModel) {
    const nameExist = await this.findByName(service.name);
    if (nameExist) {
      return null;
    }

    this.services.push(service);
    return service;
  }

  public async findAll() {
    return this.services;
  }

  public async findById(id: string) {
    const service = this.services.find((service) => service.id === id);
    return service || null;
  }

  public async update(service: ServiceModel) {
    const index = this.services.findIndex((s) => s.id === service.id);
    this.services[index] = service;
    return service;
  }

  public async delete(id: string) {
    this.services = this.services.filter((service) => service.id !== id);
    return true;
  }

  public async findByCategory(category: string) {
    return this.services.filter((service) => service.category === category);
  }

  public async getAllCategories() {
    const categories = this.services.map((service) => service.category);
    return [...new Set(categories)];
  }

  public async findByName(name: string) {
    const service = this.services.find((service) => service.name === name);
    return service || null;
  }
}
