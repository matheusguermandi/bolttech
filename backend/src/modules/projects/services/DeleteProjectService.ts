import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectssRepository: IProjectsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const projects = await this.projectssRepository.find(id);

    if (!projects) {
      throw new AppError('This project does not exist', 400);
    }

    await this.projectssRepository.delete(id);
  }
}

export default DeleteProjectService;
