import { Model } from 'mongoose';

export type IAcademicSemesterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademiSemesterTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademiSemesterCode = '01' | '02' | '03';

export type IAcademicSemseter = {
  title: IAcademiSemesterTitle;
  year: string;
  code: IAcademiSemesterCode;
  startMonth: IAcademicSemesterMonth;
  endMonth: IAcademicSemesterMonth;
};

export type AcademicSemesterModel = Model<IAcademicSemseter>;

export type IAcademicSemseterFilters = {
  searchTerm?: string;
};
