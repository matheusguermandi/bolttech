import { getRepository, Repository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ITasksDTO from '@modules/tasks/dtos/ITasksDTO';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async list(project_id: string): Promise<Task[] | undefined> {
    const taskss = await this.ormRepository.find({ where: { project_id: project_id } });

    return taskss || undefined;
  }

  public async find(id: string): Promise<Task | undefined> {
    const tasks = await this.ormRepository.findOne(id);

    return tasks || undefined;
  }

  public async create(projectCreate: ITasksDTO): Promise<Task> {
    const tasks = this.ormRepository.create(projectCreate);

    await this.ormRepository.save(tasks);

    return tasks;
  }

  public async update(projectUpdate: ITasksDTO): Promise<Task> {
    return this.ormRepository.save(projectUpdate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default TasksRepository;
