import IClientRepository from "@/core/repository/client.repository";
import mockClients from "./mock/client.table";
import { ClientModel, CreateClientDTO } from "@/core/model/client.model";
import UserTable from "./user";

export default class Client implements IClientRepository {
  private clients;

  public constructor(initialTableState?: ClientModel[]) {
    this.clients = initialTableState || [...mockClients];
  }
  async findByName(name: string) {
    return this.clients.find((item) => item.name.includes(name)) || null;
  }

  /**
   * @description This method use a mocked data by user class to create a new client
   * @param newClient
   * @returns
   */
  async create(newClient: CreateClientDTO) {
    const dbUser = new UserTable();

    const emailExist = await this.findByEmail(newClient.email);
    const documentExist = await this.findByDocument(newClient.document);
    const userExist = await dbUser.findById(newClient.userId);

    if (emailExist || documentExist || !userExist) {
      return null;
    }

    const client = {
      ...newClient,
      id: Math.random().toString(36).substr(2, 9),
    };

    this.clients.push(client);
    return client;
  }

  async findAll() {
    return this.clients;
  }

  async findById(id: string) {
    return this.clients.find((item) => item.id === id) || null;
  }

  async findByDocument(document: string) {
    return this.clients.find((item) => item.document === document) || null;
  }

  async findByEmail(email: string) {
    return this.clients.find((item) => item.email === email) || null;
  }

  async update(updateClient: ClientModel) {
    const clientIndex = this.clients.findIndex((m) => m.id === updateClient.id);
    this.clients[clientIndex] = updateClient;
    return updateClient;
  }

  async delete(id: string) {
    this.clients = this.clients.filter((item) => item.id !== id);
    return true;
  }

  async findAllByUserId(userId: string) {
    const clients = this.clients.filter((item) => item.userId === userId);
    console.log(clients);
    return clients.length ? clients : null;
  }
}
