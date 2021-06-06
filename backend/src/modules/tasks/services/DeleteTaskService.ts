import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('TasksRepository')
    private taskssRepository: ITasksRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const tasks = await this.taskssRepository.find(id);

    if (!tasks) {
      throw new AppError('This task does not exist', 400);
    }

    await this.taskssRepository.delete(id);
  }
}

export default DeleteProjectService;
