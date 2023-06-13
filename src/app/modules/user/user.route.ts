import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);
//create faculty same as create student
//create admin same as create student

export const UserRoutes = router;
