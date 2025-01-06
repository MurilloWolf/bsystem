import { ClientModel } from "../model/client.model";

export default interface IClientRepository {
  create(newClient: ClientModel): Promise<ClientModel | null>;
  findAll(): Promise<ClientModel[]>;
  findById(id: string): Promise<ClientModel | null>;
  findAllByUserId(userId: string): Promise<ClientModel[] | null>;
  findByEmail(email: string): Promise<ClientModel | null>;
  findByDocument(document: string): Promise<ClientModel | null>;
  findByName(name: string): Promise<ClientModel | null>;
  update(updateClient: ClientModel): Promise<ClientModel>;
  delete(id: string): Promise<boolean>;
}
