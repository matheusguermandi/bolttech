import User from "@modules/users/infra/typeorm/entities/User";

export default interface IProjectsDTO {
  id?: string;
  name: string;
  user_id?: User;
}
