import { inject, injectable } from 'tsyringe';

import Users from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(): Promise<Users[] | undefined> {
        const users = await this.usersRepository.list();

        return users;
    }
}

export default ListUserService;