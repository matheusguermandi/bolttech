import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersDTO from '@modules/users/dtos/IUsersDTO';

import Users from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async list(): Promise<Users[] | undefined> {
    const users = await this.ormRepository.find();

    return users || undefined;
  }

  public async find(id: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user || undefined;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user || undefined;
  }

  public async create(userCreate: IUsersDTO): Promise<Users> {
    const user = this.ormRepository.create(userCreate);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(userUpdate: IUsersDTO): Promise<Users> {
    return this.ormRepository.save(userUpdate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

}

export default UsersRepository;