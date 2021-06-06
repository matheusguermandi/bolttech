import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProjectService from '@modules/projects/services/ListProjectService';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import DeleteProjectService from '@modules/projects/services/DeleteProjectService';

export default class ProjectsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listProjects = container.resolve(ListProjectService);

    const projects = await listProjects.execute(user_id);

    return response.json(projects);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, user_id } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const projects = await createProject.execute({
      name,
      user_id
    });

    return response.json(projects);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const projects = await updateProject.execute({
      id,
      name,
    });

    return response.json(projects);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute(id);

    return response.json({ msg: 'Record successfully deleted' });
  }
}
