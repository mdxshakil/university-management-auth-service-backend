import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization Token and verify it
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
      //verified token
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );
      if (!verifiedUser.userId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
      }
      //if verified, set the payload to req and go to next middleware
      req.user = verifiedUser;
      //role based authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
