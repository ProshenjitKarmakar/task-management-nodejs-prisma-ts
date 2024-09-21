import { Request } from 'express';
import responseHandler from './../helpers/responseHandler.ts';
import httpStatus from 'http-status';
import { TaskDao } from './../dao/implementations/TaskDao.ts';
import { TStatus } from '../interfaces/task.interface.ts';

export class TaskService {
    private taskDao: TaskDao;
    constructor() {
        this.taskDao = new TaskDao();
    }

    countTasksByStatus = async (req: Request) => {
        try {
            let message = 'Count found successfully!';
            const response = await this.taskDao.countTasksByStatus();
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

    getAllTask = async (req: Request) => {
        try {
            let message = 'Task data successfully fetched!';
            const { page, perPage, startDate, endDate, status, priority } = req.query;

            const take = Number(perPage);
            const pageNumber = Number(page);
            const skip = (pageNumber - 1) * take;

            let where: { dueDate: { gte: any, lte: any }, status?: any, priority?: any } = {
                dueDate: {
                    gte: new Date(startDate as string), // Greater than or equal to fromDate
                    lte: new Date(endDate as string),   // Less than or equal to toDate
                },
            }

            if (status === 'PENDING' || status === 'PROGRESS' || status === 'COMPLETED') {
                where = {
                    ...where,
                    status: status as TStatus,
                }
            }

            if (priority === 'LOW' || priority === 'MEDIUM' || priority === 'HIGH') {
                where = {
                    ...where,
                    priority: priority,
                }
            }

            console.log("==where====", where);


            const totalCount = await this.taskDao.count(where);

            const response = await this.taskDao.findAllWithPaginationAndDates(skip, take, where);
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