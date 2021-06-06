import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.login,
);

sessionsRouter.post(
  '/verify',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  sessionsController.verify,
);

export default sessionsRouter;
