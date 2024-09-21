import { Router } from 'express';
import { TeskValidator } from './../validators/task.validator.ts';
import { TaskController } from './../contollers/task.controller.ts';

const router = Router();

const taskValidator = new TeskValidator();
const testController = new TaskController();

router.get('/list', taskValidator.listTaskDataValidate, testController.listTask);
router.post('/add', taskValidator.addTaskDataValidate, testController.addTask);
router.put('/update', taskValidator.updateTaskDataValidate, testController.updateTask);
router.delete('/delete', taskValidator.deleteTaskDataValidate, testController.deleteTask);

export default router;