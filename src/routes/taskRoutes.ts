import { Router } from 'express';
import { TeskValidator } from './../validators/task.validator.ts';
import { TaskController } from './../contollers/task.controller.ts';

const router = Router();

const taskValidator = new TeskValidator();
const testController = new TaskController();

router.post('/add', taskValidator.addTaskDataValidate, testController.addTask);

export default router;