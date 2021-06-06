import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);
