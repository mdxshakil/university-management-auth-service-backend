import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    next();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User created succesfully',
      data: result,
    });
  }
);

export const UserController = {
  createUser,
};
