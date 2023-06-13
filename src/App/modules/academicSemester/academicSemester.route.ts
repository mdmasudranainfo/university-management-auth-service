import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { academicSemesterValidation } from './academicSemeter.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(academicSemesterValidation.createAcademicSemeterZodShema)
  //   UserController.createUse
);

export const UserRouter = router;
