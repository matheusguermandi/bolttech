import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserDTO from '@modules/users/dtos/IUsersDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async list(): Promise<User[] | undefined>{
    return this.users;
  }

  public async find(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async delete(id: string): Promise<void> {
    this.users.splice(Number(id), 1)
  }

}

export default FakeUsersRepository;
