import { inject, injectable } from 'tsyringe';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import IProjectssRepository from '@modules/projects/repositories/IProjectsRepository';

import ITasksDTO from '@modules/tasks/dtos/ITasksDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectssRepository,
  ) {}

  public async execute({
    description,
    project_id,
  }: ITasksDTO): Promise<Task> {
    const project = await this.projectsRepository.find(String(project_id));

    if (!project) {
      throw new AppError('This project does not exist', 400);
    }

    const tasks = await this.tasksRepository.create({
      description,
      project_id,
    });

    return tasks;
  }
}

export default CreateTaskService;
