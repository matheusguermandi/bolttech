import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersService from '@modules/users/services/ListUserService';
import FindUsersService from '@modules/users/services/FindUserService';
import CreateUsersService from '@modules/users/services/CreateUserService';
import UpdateUsersService from '@modules/users/services/UpdateUserService';
import DeleteUsersService from '@modules/users/services/DeleteUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(classToClass(users));
  }

  public async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findUser = container.resolve(FindUsersService);

    const user = await findUser.execute(id);

    return response.json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, password_confirmation } = request.body;

    const createUsers = container.resolve(CreateUsersService);

    const user = await createUsers.execute({
      name,
      email,
      password,
      password_confirmation
    });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateUsers = container.resolve(UpdateUsersService);

    const user = await updateUsers.execute({
      id,
      name,
      email,
    });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUsersService);

    await deleteUser.execute(id);

    return response.json({ msg: 'Record successfully deleted' });
  }
}