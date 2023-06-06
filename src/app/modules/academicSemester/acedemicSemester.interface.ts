import { Model } from 'mongoose';

export type IAcademicSemseter = {
  title: string;
  year: number;
  code: string;
  startMonth: string;
  endMonth: string;
};

export type AcademicSemesterModel = Model<IAcademicSemseter>;
