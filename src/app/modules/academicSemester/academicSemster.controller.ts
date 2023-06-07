import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { ...acdemicSemseterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      acdemicSemseterData
    );
    next();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
