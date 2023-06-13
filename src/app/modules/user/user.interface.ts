import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';

export type UserModel = Model<IUser, Record<string, unknown>>;

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; implement in future
  // admin?: Types.ObjectId | IAdmin; implement in future
};
