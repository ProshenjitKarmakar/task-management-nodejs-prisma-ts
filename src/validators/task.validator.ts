import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import zod, { ZodError } from 'zod';
import responseHandler from './../helpers/responseHandler.ts';
import { errorMessageFormatter } from "./../helpers/zod.ts";

export class TeskValidator {
    listTaskDataValidate = async (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            page: zod.number({
                required_error: 'Page is required',
            }),
            perPage: zod.number({
                required_error: 'Perpage is required',
            }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response);
            } else {
                next(err);
            }

        }
    }
    addTaskDataValidate = async (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            title: zod.string({
                required_error: 'Title is required',
            }),
            description: zod.string({
                required_error: 'Description is required',
            }),
            dueDate: zod.string({
                required_error: 'Date is required',
            }),
            priority: zod.enum(['LOW', 'MEDIUM', 'HIGH'], {
                required_error: 'Priority is required',
                invalid_type_error: 'Invalid priority value',
            }),
            status: zod.enum(['PENDING', 'PROGRESS', 'COMPLETED'], {
                required_error: 'Status is required',
                invalid_type_error: 'Invalid status value',
            }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response);  // Changed to 403 Forbidden
            } else {
                next(err); // Pass any unexpected errors to the error handling middleware
            }

        }
    }
    updateTaskDataValidate = async (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            id: zod.number({
                required_error: 'Id is required',
            }),
            title: zod.string({
                required_error: 'Title is required',
            }),
            description: zod.string({
                required_error: 'Description is required',
            }),
            dueDate: zod.string({
                required_error: 'Date is required',
            }),
            priority: zod.enum(['LOW', 'MEDIUM', 'HIGH'], {
                required_error: 'Priority is required',
                invalid_type_error: 'Invalid priority value',
            }),
            status: zod.enum(['PENDING', 'PROGRESS', 'COMPLETED'], {
                required_error: 'Status is required',
                invalid_type_error: 'Invalid status value',
            }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response);
            } else {
                next(err);
            }

        }
    }
    deleteTaskDataValidate = async (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            id: zod.number({
                required_error: 'Id is required',
            }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response);
            } else {
                next(err);
            }

        }
    }
}