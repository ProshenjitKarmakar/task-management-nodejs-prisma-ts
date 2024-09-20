import { Router } from 'express';
import { TestValidator } from './../validators/test.validator.ts';
import { TestController } from './../contollers/test.controller.ts';

const router = Router();

const testValidator = new TestValidator();
const testController = new TestController();

router.get('/all', testValidator.testDataValidate, testController.userProfileUpdate);

export default router;