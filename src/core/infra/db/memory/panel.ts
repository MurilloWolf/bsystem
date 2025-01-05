import IPanelRepository from "@/core/repository/panel.repository";
import mockPanel from "./mock/panel.table";
import { PanelModel } from "@/core/model/panel.model";

export default class Panel implements IPanelRepository {
  private panels;

  public constructor(initialTableState?: PanelModel[]) {
    this.panels = initialTableState || [...mockPanel];
  }

  public async create(panel: PanelModel) {
    this.panels.push(panel);
    return panel;
  }

  public async findAll() {
    return this.panels;
  }

  public async findById(id: string) {
    const panel = this.panels.find((panel) => panel.id === id);
    return panel || null;
  }

  public async findAllByPower(power: number) {
    return this.panels.filter((panel) => panel.power === power);
  }

  public async findAllByVoltage(voltage: number) {
    return this.panels.filter((panel) => panel.voltage === voltage);
  }

  public async findByName(name: string) {
    return this.panels.find((panel) => panel.model.includes(name)) || null;
  }

  public async update(panel: PanelModel): Promise<PanelModel> {
    const index = this.panels.findIndex((p) => p.id === panel.id);
    this.panels[index] = panel;
    return panel;
  }

  public async delete(id: string): Promise<boolean> {
    const index = this.panels.findIndex((panel) => panel.id === id);
    if (index === -1) {
      return false;
    }

    this.panels.splice(index, 1);
    return true;
  }
}
