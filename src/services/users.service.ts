import { Request, Response } from 'express';
import responseHandler from './../helpers/responseHandler.ts';
import httpStatus from 'http-status';
import { UserDao } from './../dao/implementations/UserDao.ts';


export class UserService {
    private userDao: UserDao;
    constructor() {
        this.userDao = new UserDao();
    }

    userCreate = async (req: Request) => {
        try {
            const message = "User created successfully!";
            const data = {
                name: req.body.name,
                email: req.body.email
            }
            const response = await this.userDao.create(data);
            return responseHandler.returnSuccess(httpStatus.OK, message, response)
        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!');
        }
    }

    userList = async () => {
        try {
            const message = 'User list fetched successfully!'
            const response = await this.userDao.list();
            console.log("====response====", response);
            return responseHandler.returnSuccess(httpStatus.OK, message, response);
        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!')
        }
    }

    userUpdate = async (req: Request) => {
        try {
            const message = 'User updated successfully!';
            const where = {
                id: req.body.id
            };
            const data = {
                name: req.body.name,
                email: req.body.email
            };
            const response = this.userDao.update(where, data);
            if (!response) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!')
            }
            return responseHandler.returnSuccess(httpStatus.OK, message, { id: req.body.id, ...data });

        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!')
        }
    }

    userDelete = async (req: Request) => {
        try {
            const message = 'User deleted successfully!';
            const where = {
                id: req.body.id
            };
            const data = {
                id: req.body.id,
            };
            const response = this.userDao.delete(where);
            if (!response) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'User deleted failed!')
            }
            return responseHandler.returnSuccess(httpStatus.OK, message, data);

        } catch (e) {
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong!')
        }
    }
}