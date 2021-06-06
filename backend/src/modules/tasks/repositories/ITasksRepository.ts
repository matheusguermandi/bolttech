import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ITasksDTO from '@modules/tasks/dtos/ITasksDTO';

export default interface ITaskssRepository {
  list(project_id: string): Promise<Task[] | undefined>;
  find(id: string): Promise<Task | undefined>;
  create(data: ITasksDTO): Promise<Task>;
  update(data: ITasksDTO): Promise<Task>;
  delete(id: string): Promise<void>;
}
