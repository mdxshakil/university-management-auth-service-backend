import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemseter } from './acedemicSemester.interface';
import { AcademicSemester } from './acedemicSemester.model';

const createSemester = async (
  payload: IAcademicSemseter
): Promise<IAcademicSemseter> => {
  if (payload.code !== academicSemesterTitleCodeMapper[payload.title]) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
