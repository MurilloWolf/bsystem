import { ModuleModel } from "@/core/model/modules.model";
import IModulesRepository from "@/core/repository/modules.repository";
import mockModules from "./mock/modules.table";

export default class Modules implements IModulesRepository {
  private modules;

  public constructor(initialTableState?: ModuleModel[]) {
    this.modules = initialTableState || [...mockModules];
  }

  async create(newModule: ModuleModel) {
    const nameExist = await this.findByModel(newModule.model);
    if (nameExist) {
      return null;
    }
    this.modules.push(newModule);
    return newModule;
  }

  async findAll() {
    return this.modules;
  }

  async findById(id: string) {
    return this.modules.find((item) => item.id === id) || null;
  }

  async findAllByPower(power: number) {
    return this.modules.filter((item) => item.power === power);
  }

  async findAllByType(type: "mono" | "bifacial" | "poly") {
    return this.modules.filter((item) => item.type === type);
  }

  async findAllByProducer(producer: string) {
    return this.modules.filter((item) => item.producer === producer);
  }

  async findByModel(model: string) {
    return this.modules.find((item) => item.model.includes(model)) || null;
  }

  async update(updateModule: ModuleModel) {
    const moduleIndex = this.modules.findIndex((m) => m.id === updateModule.id);
    this.modules[moduleIndex] = updateModule;
    return updateModule;
  }

  async delete(id: string) {
    this.modules = this.modules.filter((item) => item.id !== id);
    return true;
  }
}
