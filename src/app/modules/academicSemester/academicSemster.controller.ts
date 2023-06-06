import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.services';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...acdemicSemseterData } = req.body;
    const result = await AcademicSemesterService.createSemester(
      acdemicSemseterData
    );
    res.status(200).json({
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemester,
};
