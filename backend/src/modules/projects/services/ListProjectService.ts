import { inject, injectable } from 'tsyringe';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IUserssRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('UsersRepository')
    private usersRepository: IUserssRepository,
  ) {}

  public async execute(user_id: string): Promise<Project[] | undefined> {
    const users = await this.usersRepository.find(String(user_id));

    if (!users) {
      throw new AppError('This user does not exist', 400);
    }

    const projects = await this.projectsRepository.list(user_id);

    return projects;
  }
}

export default ListProjectsService;
