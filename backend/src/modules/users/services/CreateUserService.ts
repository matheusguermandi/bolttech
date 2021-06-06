import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import authConfig from '@config/auth';

import IUsersDTO from '@modules/users/dtos/IUsersDTO';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';
import { sign } from 'jsonwebtoken';

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    password_confirmation,
  }: IUsersDTO): Promise<IResponse> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) {
      throw new AppError('Email address already used.');
    }

    if (password !== password_confirmation) {
      throw new AppError('Password and confirmation password do not match.');
    }

    const hashedPassword = await this.hashProvider.generateHash(
      String(password),
    );

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateUserService;
