import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  'create-user',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
);
