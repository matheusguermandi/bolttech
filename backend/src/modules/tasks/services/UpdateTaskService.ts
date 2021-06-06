import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ITasksDTO from '@modules/tasks/dtos/ITasksDTO';

@injectable()
class UpdateTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ id, description }: ITasksDTO): Promise<Task> {
    const tasks = await this.tasksRepository.find(String(id));

    if (!tasks) {
      throw new AppError('This task does not exist', 400);
    }

    tasks.description = String(description);

    return this.tasksRepository.update(tasks);
  }
}

export default UpdateTaskService;
