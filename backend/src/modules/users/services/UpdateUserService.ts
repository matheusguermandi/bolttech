import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Users from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUsersDTO from '@modules/users/dtos/IUsersDTO';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, name, email }: IUsersDTO): Promise<Users> {
    const users = await this.usersRepository.find(String(id));

    if (!users) {
      throw new AppError('This user does not exist', 400);
    }

    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail && checkEmail.id !== id) {
      throw new AppError('E-mail already in use', 400);
    }

    users.name = name;
    users.email = email;

    return this.usersRepository.update(users);
  }
}

export default UpdateUserService;