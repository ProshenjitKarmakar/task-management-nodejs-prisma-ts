import { Router } from "express";
import { AuthController } from "./../contollers/auth.controller.ts";
import varifyToken from "./../helpers/verifyToken.ts";
import { TokenService } from "./../services/token.service.ts";
import { AuthValidator } from "./../validators/auth.validator.ts";

const router = Router();
const authValidator = new AuthValidator();
const authController = new AuthController();
const tokenService = new TokenService();

router.post('/registration', authValidator.registrationDataValidate, authController.registration);
router.post('/login', authValidator.loginDataValidation, authController.login);
router.get('/user-list', varifyToken, authController.findAllUser);
router.put('/update-user', varifyToken, authValidator.userUpdateDataValidation, authController.updateUser);
router.post('/stripe-payment', varifyToken, authValidator.stripePaymentDataValidation, authController.stripePayment);
router.post('/login-with-google', authValidator.loginDataValidation, authController.login)



export default router;