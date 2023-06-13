import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created succesfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
