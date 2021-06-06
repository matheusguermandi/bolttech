import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class FindUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string): Promise<User> {
    const user = await this.usersRepository.find(id);

    if (!user) {
      throw new AppError('User Not found', 404);
    }

    return user;
  }
}

export default FindUserService;
