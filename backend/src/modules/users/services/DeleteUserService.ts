import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(id: string): Promise<void> {
        const users = await this.usersRepository.find(id);

        if (!users) {
            throw new AppError('This user does not exist', 400);
        }

        await this.usersRepository.delete(id);
    }
}

export default DeleteUserService;