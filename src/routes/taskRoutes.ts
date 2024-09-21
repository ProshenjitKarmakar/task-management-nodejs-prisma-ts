import { Router } from 'express';
import { TeskValidator } from './../validators/task.validator.ts';
import { TaskController } from './../contollers/task.controller.ts';
import varifyToken from './../helpers/verifyToken.ts';

const router = Router();

const taskValidator = new TeskValidator();
const testController = new TaskController();

router.get('/dashboard/count', varifyToken, testController.dashboardCount);

router.get('/list', varifyToken, taskValidator.listTaskDataValidate, testController.listTask);
router.post('/add', varifyToken, taskValidator.addTaskDataValidate, testController.addTask);
router.put('/update', varifyToken, taskValidator.updateTaskDataValidate, testController.updateTask);
router.delete('/delete', varifyToken, taskValidator.deleteTaskDataValidate, testController.deleteTask);

export default router;