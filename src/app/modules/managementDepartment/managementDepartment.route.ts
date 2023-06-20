import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartments);

router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.delete(
  '/:id',
  ManagementDepartmentController.deleteSingleManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

export const managementDepartmentRoutes = router;
