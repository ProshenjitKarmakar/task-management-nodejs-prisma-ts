import { Router } from 'express';
import { UserValidator } from './../validators/users.validator.ts';
import { UserController } from './../contollers/users.controller.ts';

const router = Router();

const userValidator = new UserValidator();
const userController = new UserController();

router.post('/create', userValidator.createUserValidator, userController.userCreate);
router.get('/list', userController.userList);
router.put('/update', userValidator.updateUserValidator, userController.userUpdate);
router.delete('/delete', userValidator.deleteUserValidator, userController.userDelete);





export default router;