import IClientRepository from "../repository/client.repository";

export default class FindClients {
  private clientRepository: IClientRepository;

  constructor(clientRepository: IClientRepository) {
    this.clientRepository = clientRepository;
  }

  public async execute() {
    const clients = await this.clientRepository.findAllByUserId("1");

    return clients;
  }
}
