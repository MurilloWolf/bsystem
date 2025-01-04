import { UserModel } from "@/core/model/user.model";
import user from "./mock/user.table";

import IUserRepository from "@/core/repository/user.repository";

export default class UserTable implements IUserRepository {
  users;

  public constructor(initialTableState?: UserModel[]) {
    this.users = initialTableState || [...user];
  }

  async create(user: UserModel) {
    const emailExist = await this.findByEmail(user.email);
    const cpfExist = await this.findByCpf(user.cpf);

    if (emailExist || cpfExist) {
      return null;
    }
    this.users.push(user);
    return user;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null;
  }

  async findByCpf(cpf: string) {
    return this.users.find((user) => user.cpf === cpf) || null;
  }

  async findByName(name: string) {
    return this.users.filter((user) => user.name.includes(name));
  }

  async listAll() {
    return this.users;
  }

  async update(user: UserModel) {
    const userIndex = this.users.findIndex((u) => u.id === user.id);
    this.users[userIndex] = user;
    return user;
  }

  async delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
}
