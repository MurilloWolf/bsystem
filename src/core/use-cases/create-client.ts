import UseCase from ".";
import IClientRepository from "../repository/client.repository";
import { CreateClientDTO } from "../model/client.model";

export default class CreateClient implements UseCase {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute(input: CreateClientDTO) {
    const client = await this.clientRepository.create(input);

    return client;
  }
}
