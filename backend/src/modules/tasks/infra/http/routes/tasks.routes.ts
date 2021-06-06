import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import TasksController from '../controllers/TasksController';

const TasksRouter = Router();

const tasksController = new TasksController();

TasksRouter.get(
  '/:project_id',
  celebrate({
    [Segments.PARAMS]: {
      project_id: Joi.string().uuid().required(),
    },
  }),
  tasksController.list,
);

TasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      project_id: Joi.string().uuid().required(),
    },
  }),
  tasksController.create,
);

TasksRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  tasksController.update,
);

TasksRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.updateStatus,
);

TasksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  tasksController.delete,
);

export default TasksRouter;
