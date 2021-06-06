import { getRepository, Repository } from 'typeorm';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IProjectsDTO from '@modules/projects/dtos/IProjectsDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async list(user_id: string): Promise<Project[] | undefined> {
    const projectss = await this.ormRepository.find({ where: { user_id: user_id } });

    return projectss || undefined;
  }

  public async find(id: string): Promise<Project | undefined> {
    const projects = await this.ormRepository.findOne(id);

    return projects || undefined;
  }

  public async create(projectCreate: IProjectsDTO): Promise<Project> {
    const projects = this.ormRepository.create(projectCreate);

    await this.ormRepository.save(projects);

    return projects;
  }

  public async update(projectUpdate: IProjectsDTO): Promise<Project> {
    return this.ormRepository.save(projectUpdate);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProjectsRepository;
