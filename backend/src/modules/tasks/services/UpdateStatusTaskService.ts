import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ITasksDTO from '../dtos/ITasksDTO';

@injectable()
class UpdateStatusTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute({ id }: ITasksDTO): Promise<Task> {
    const tasks = await this.tasksRepository.find(String(id));

    if (!tasks) {
      throw new AppError('This task does not exist', 400);
    }

    tasks.status = 'DONE';
    tasks.date_end = new Date();

    return this.tasksRepository.update(tasks);
  }
}

export default UpdateStatusTaskService;
