import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProjectsController from '../controllers/ProjectsController';

const ProjectsRouter = Router();

const projectsController = new ProjectsController();

ProjectsRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  projectsController.list,
);

ProjectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  projectsController.create,
);

ProjectsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  projectsController.update,
);

ProjectsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.delete,
);

export default ProjectsRouter;
