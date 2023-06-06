import { IAcademicSemseter } from './acedemicSemester.interface';
import { AcademicSemester } from './acedemicSemester.model';

const createSemester = async (
  payload: IAcademicSemseter
): Promise<IAcademicSemseter> => {
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
