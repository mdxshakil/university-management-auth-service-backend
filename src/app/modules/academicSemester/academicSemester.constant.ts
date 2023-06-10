import {
  IAcademiSemesterCode,
  IAcademiSemesterTitle,
  IAcademicSemesterMonth,
} from './acedemicSemester.interface';

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitles: IAcademiSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: IAcademiSemesterCode[] = ['01', '02', '03'];

export const academicSemesterTitleCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchableFields = ['title', 'code', 'year'];
export const filterableFields = ['searchTerm', 'title', 'code', 'year'];
