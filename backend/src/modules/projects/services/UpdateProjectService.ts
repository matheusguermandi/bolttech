import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IProjectsDTO from '@modules/projects/dtos/IProjectsDTO';

@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ id, name }: IProjectsDTO): Promise<Project> {
    const projects = await this.projectsRepository.find(String(id));

    if (!projects) {
      throw new AppError('This project does not exist', 400);
    }

    projects.name = name;

    return this.projectsRepository.update(projects);
  }
}

export default UpdateProjectService;
