import { UserModel } from "../model/user.model";

export default interface IUserRepository {
  create(user: UserModel): Promise<UserModel | null>;
  findById(id: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  findByCpf(cpf: string): Promise<UserModel | null>;
  findByName(name: string): Promise<UserModel[] | []>;
  listAll(): Promise<UserModel[]>;
  update(user: UserModel): Promise<UserModel | null>;
  delete(id: string): Promise<boolean>;
}
