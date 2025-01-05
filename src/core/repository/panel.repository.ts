import { PanelModel } from "../model/panel.model";

export default interface IPanelRepository {
  create(panel: PanelModel): Promise<PanelModel>;
  findAll(): Promise<PanelModel[]>;
  findById(id: string): Promise<PanelModel | null>;
  findAllByPower(power: number): Promise<PanelModel[]>;
  findAllByVoltage(voltage: number): Promise<PanelModel[]>;
  findByName(name: string): Promise<PanelModel | null>;
  update(panel: PanelModel): Promise<PanelModel>;
  delete(id: string): Promise<boolean>;
}
