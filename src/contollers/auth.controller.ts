import { Request, Response } from "express";
import httpStatus from 'http-status';
import { AuthService } from "./../services/auth.service.ts";

export class AuthController {
    private authService;

    constructor() {
        this.authService = new AuthService();
    }

    registration = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.registration(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.login(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    loginWithGoogle = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.loginWithGoogle(req);
            // res.status(user.statusCode).send(user.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    findAllUser = async (req: Request, res: Response) => {
        try {
            const users = await this.authService.findAllUser(req)
            res.status(users.statusCode).send(users.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.userUpdate(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    stripePayment = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.stripePayment(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            console.log("====Error=====", e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }
}