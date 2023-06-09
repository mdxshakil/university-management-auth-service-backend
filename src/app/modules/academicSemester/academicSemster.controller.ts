import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.services';
import { IAcademicSemseter } from './acedemicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...acdemicSemseterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      acdemicSemseterData
    );
    sendResponse<IAcademicSemseter>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester created successfully',
      data: result,
    });
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, ['searchTerm']);

  const result = await AcademicSemesterService.getAllSemesters(
    paginationOptions,
    filters
  );

  sendResponse<IAcademicSemseter[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semesters retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
};
