import { Request, Response } from 'express';
import { UserService } from './../services/users.service.ts';
import httpStatus from 'http-status';

export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    userCreate = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.userCreate(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            res.send(httpStatus.BAD_REQUEST).send(e);
        }
    }

    userList = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.userList();
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            res.send(httpStatus.BAD_REQUEST).send(e);
        }
    }

    userUpdate = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.userUpdate(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            res.send(httpStatus.BAD_REQUEST).send(e);
        }
    }

    userDelete = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.userDelete(req);
            res.status(user.statusCode).send(user.response);
        } catch (e) {
            res.send(httpStatus.BAD_REQUEST).send(e);
        }
    }
}