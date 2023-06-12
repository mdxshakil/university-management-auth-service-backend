import { IAcademicSemseter } from '../academicSemester/acedemicSemester.interface';
import { User } from './user.model';

//generate student id
const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemester: IAcademicSemseter
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //student id sample: 240100001
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};

//generate faculty id
const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};
export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //faculty id sample: F-00001
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};

//generate admin id
const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // eslint-disable-next-line no-undefined
  return lastAdmin?.id ? lastAdmin?.id.substring(2) : undefined;
};
export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //admin id sample: A-00001
  incrementedId = `A-${incrementedId}`;
  return incrementedId;
};
