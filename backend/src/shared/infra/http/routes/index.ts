import { Router } from 'express';

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';

import ensureAuthenticated from '@shared/infra/middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use(ensureAuthenticated);

routes.use('/projects', projectsRouter);
routes.use('/tasks', tasksRouter);

export default routes;
