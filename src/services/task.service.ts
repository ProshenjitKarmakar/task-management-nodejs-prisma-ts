import { Request } from 'express';
import responseHandler from './../helpers/responseHandler.ts';
import httpStatus from 'http-status';
import { TaskDao } from './../dao/implementations/TaskDao.ts';

export class TaskService {
    private taskDao: TaskDao;
    constructor() {
        this.taskDao = new TaskDao();
    }

    addTask = async (req: Request) => {
        try {
            let message = 'Task created successfully!';
            const data = { ...req.body };
            const response = await this.taskDao.create(data);
            console.log("=====response====", response);
            if (response) {
                const payload = {
                    ...response
                }
                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Task created failed!');
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }

    getAllTask = async (req: Request) => {
        try {
            let message = 'Test data successfully fetched!';
            console.log(req)
            return responseHandler.returnSuccess(httpStatus.OK, message, req.body);
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }
}