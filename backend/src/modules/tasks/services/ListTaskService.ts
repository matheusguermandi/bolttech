import { inject, injectable } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import AppError from '@shared/errors/AppError';
import IProjectssRepository from '@modules/projects/repositories/IProjectsRepository';

@injectable()
class ListTasksService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectssRepository,
  ) {}

  public async execute(project_id: string): Promise<Task[] | undefined> {
    const project = await this.projectsRepository.find(String(project_id));

    if (!project) {
      throw new AppError('This project does not exist', 400);
    }

    const tasks = await this.tasksRepository.list(project_id);

    return tasks;
  }
}

export default ListTasksService;
