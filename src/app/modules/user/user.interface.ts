import { Model, Types } from 'mongoose';
import { IAdmin } from '../admin/admin.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IStudent } from '../student/student.interface';

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  admin?: Types.ObjectId | IAdmin;
  faculty?: Types.ObjectId | IFaculty;
  needsPasswordChange: true | false;
  paswordChangedAt?: Date;
};

export type IUserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    // eslint-disable-next-line no-unused-vars
    givenPassword: string,
    // eslint-disable-next-line no-unused-vars
    savedPassword: string
  ): Promise<boolean>;
};
