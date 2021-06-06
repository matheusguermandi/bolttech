import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import ensureAuthenticated from '@shared/infra/middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/list/', ensureAuthenticated, usersController.list);

usersRouter.get(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.find,
);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
    },
  }),
  usersController.update,
);

usersRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

export default usersRouter;
