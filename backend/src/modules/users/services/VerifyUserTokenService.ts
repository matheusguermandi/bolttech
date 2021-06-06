import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

class VerifyUserTokenService {
  public async execute(token: string): Promise<boolean> {
    try {
      verify(token, authConfig.jwt.secret);
      return true;

    } catch (error) {
      throw new AppError('Invalid JWT token', 401);
    }
  }
}

export default VerifyUserTokenService;
