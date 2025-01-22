import { ModuleModel } from "../model/modules.model";

export default interface IModulesRepository {
  create(newModule: ModuleModel): Promise<ModuleModel | null>;
  findAll(): Promise<ModuleModel[]>;
  findById(id: string): Promise<ModuleModel | null>;
  findAllByPower(power: number): Promise<ModuleModel[]>;
  findAllByType(type: "mono" | "bifacial" | "poly"): Promise<ModuleModel[]>;
  findAllByProducer(producer: string): Promise<ModuleModel[]>;
  findByModel(model: string): Promise<ModuleModel | null>;
  update(updateModule: ModuleModel): Promise<ModuleModel>;
  delete(id: string): Promise<boolean>;
}
