import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListTaskService from '@modules/tasks/services/ListTaskService';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import UpdateTaskService from '@modules/tasks/services/UpdateTaskService';
import UpdateStatusTaskService from '@modules/tasks/services/UpdateStatusTaskService';
import DeleteTaskService from '@modules/tasks/services/DeleteTaskService';

export default class TasksController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.params;

    const listTasks = container.resolve(ListTaskService);

    const tasks = await listTasks.execute(project_id);

    return response.json(tasks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, project_id } = request.body;

    const createTask = container.resolve(CreateTaskService);

    const tasks = await createTask.execute({
      description,
      project_id,
    });

    return response.json(tasks);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description } = request.body;

    const updateTask = container.resolve(UpdateTaskService);

    const tasks = await updateTask.execute({
      id,
      description,
    });

    return response.json(tasks);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const updateStatusTaskService = container.resolve(UpdateStatusTaskService);

    const tasks = await updateStatusTaskService.execute({
      id,
    });

    return response.json(tasks);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTask = container.resolve(DeleteTaskService);

    await deleteTask.execute(id);

    return response.json({ msg: 'Record successfully deleted' });
  }
}
