
import Users from '@modules/users/infra/typeorm/entities/User';
import IUsersDTO from '@modules/users/dtos/IUsersDTO';

export default interface IUserssRepository {
  list(): Promise<Users[] | undefined>;
  find(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  create(data: IUsersDTO): Promise<Users>;
  update(data: IUsersDTO): Promise<Users>;
  delete(id: string): Promise<void>;
}
