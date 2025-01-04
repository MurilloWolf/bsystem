import { ServiceModel } from "../model/service.model";

export default interface IServiceRepository {
  create(service: ServiceModel): Promise<ServiceModel | null>;
  findAll(): Promise<ServiceModel[]>;
  findById(id: string): Promise<ServiceModel | null>;
  findByCategory(category: string): Promise<ServiceModel[]>;
  getAllCategories(): Promise<string[]>;
  update(service: ServiceModel): Promise<ServiceModel | null>;
  delete(id: string): Promise<boolean>;
}
