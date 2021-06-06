import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import VerifyUserTokenService from '@modules/users/services/VerifyUserTokenService';

export default class SessionsController {
  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }

  public async verify(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyUserTokenService = container.resolve(VerifyUserTokenService);

    const verify = await verifyUserTokenService.execute(token);

    return response.json({ auth: verify });
  }
}
