import { Model } from 'mongoose';

export type ManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IManagementDepartment = {
  title: string;
};
