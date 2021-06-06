import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsDTO from '@modules/projects/dtos/IProjectsDTO';

export default interface IProjectssRepository {
  list(user_id: string): Promise<Project[] | undefined>;
  find(id: string): Promise<Project | undefined>;
  create(data: IProjectsDTO): Promise<Project>;
  update(data: IProjectsDTO): Promise<Project>;
  delete(id: string): Promise<void>;
}
