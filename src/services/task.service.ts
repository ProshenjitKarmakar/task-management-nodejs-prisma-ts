import { Request } from 'express';
import responseHandler from './../helpers/responseHandler.ts';
import httpStatus from 'http-status';
import { TaskDao } from './../dao/implementations/TaskDao.ts';

export class TaskService {
    private taskDao: TaskDao;
    constructor() {
        this.taskDao = new TaskDao();
    }

    getAllTask = async (req: Request) => {
        try {
            let message = 'Task data successfully fetched!';
            const { page, perPage, fromDate, toDate } = req.query;

            const take = Number(perPage);
            const pageNumber = Number(page);
            const skip = (pageNumber - 1) * take;

            const totalCount = await this.taskDao.count();

            const response = await this.taskDao.findAllWithPaginationAndDates(skip, take, fromDate as string, toDate as string);
            console.log("=====response====", response);
            const payload = {
                data: response ?? [],
                extraData: {
                    page: pageNumber,
                    perPage: take,
                    total: totalCount
                }
            }

            if (response) {
                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Task list fetced failed!');
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, `Something went wrong! ${e}`);
        }
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
            return responseHandler.returnError(httpStatus.BAD_REQUEST, `Something went wrong! ${e}`);
        }
    }
    updateTask = async (req: Request) => {
        try {
            let message = 'Task updated successfully!';
            const data = { ...req.body };
            const where = { id: data?.id }
            const response = await this.taskDao.updateWhere(data, where);
            console.log("=====response====", response);
            if (response) {
                const payload = {
                    ...response
                }
                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Task updated failed!');
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, `Something went wrong! ${e}`);
        }
    }
    deleteTask = async (req: Request) => {
        try {
            let message = 'Task deleted successfully!';
            const data = { ...req.query };
            const where = { id: Number(data?.id) }
            const response = await this.taskDao.deleteByWhere(where);
            console.log("=====response====", response);
            if (response) {
                const payload = {
                    ...where
                }
                return responseHandler.returnSuccess(httpStatus.OK, message, payload)
            }
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Task deleted failed!');
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, `Something went wrong! ${e}`);
        }
    }


}