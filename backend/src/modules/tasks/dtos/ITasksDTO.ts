import Project from "@modules/projects/infra/typeorm/entities/Project";

export default interface ITasksDTO {
  id?: string;
  description?: string;
  status?: string;
  project_id?: Project;
}
