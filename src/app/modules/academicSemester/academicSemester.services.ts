import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemseter,
  IAcademicSemseterFilters,
} from './acedemicSemester.interface';
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

const getAllSemesters = async (
  paginationOptions: IPaginationOptions,
  filters: IAcademicSemseterFilters
): Promise<IGenericResponse<IAcademicSemseter[]>> => {
  //pagination options
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  // search options
  const { searchTerm, ...filtersData } = filters;

  // andconditions = [search, filter]
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }
  //dynamic filtering
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i', //case insensitive
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i', //case insensitive
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i', //case insensitive
  //         },
  //       },
  //     ],
  //   },
  // ];
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    //createdAt = desc
    sortConditions[sortBy] = sortOrder;
  }
  //fix $and, $or musb be non empty array
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemseter | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemseter>
): Promise<IAcademicSemseter | null> => {
  if (
    payload.title &&
    payload.code &&
    payload.code !== academicSemesterTitleCodeMapper[payload.title]
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
