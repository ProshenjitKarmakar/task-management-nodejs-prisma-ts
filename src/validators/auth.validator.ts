import zod, { ZodError } from 'zod';
import { Request, Response, NextFunction } from "express";
import httpStatus from 'http-status';
import { errorMessageFormatter } from "./../helpers/zod.ts";
import responseHandler from './../helpers/responseHandler.ts';

export class AuthValidator {
    registrationDataValidate = (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            name: zod.string({
                required_error: 'Name is requirsed',
                invalid_type_error: 'Name must be string'
            }).min(6, { message: 'Name must be 6 char!' }).max(20, { message: 'Name cann\'t be longer than 20 char!' }),
            email: zod.string({
                required_error: 'Email is required',
                invalid_type_error: 'It must be an email'
            })
                .email('Not a valid email'),
            password: zod.string({
                required_error: 'Password is required',
            }).min(6, { message: 'Password must be min 6 char!' }).max(20, { message: 'Password cann\'t be loanger than 20 char!' }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Extract error messages
                console.log("errors", err.errors);
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response); // Changed to 403 Forbidden
            } else {
                next(err); // Pass any unexpected errors to the error handling middleware
            }
        }
    }

    loginDataValidation = (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            email: zod.string({
                required_error: 'Email is required',
            })
                .email('Not a valid email'),
            password: zod.string({
                required_error: 'Password is required',
            }).min(6, { message: 'Password must be min 6 char!' }).max(20, { message: 'Password cann\'t be loanger than 20 char!' }),
        })

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Extract error messages
                console.log("errors", err.errors);
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response); // Changed to 403 Forbidden
            } else {
                next(err); // Pass any unexpected errors to the error handling middleware
            }
        }
    }

    userUpdateDataValidation = (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            id: zod.number({
                required_error: 'ID is requirsed',
            }),
            name: zod.string({
                required_error: 'Name is requirsed',
            }),
            email: zod.string({
                required_error: 'Email is required',
            })
                .email('Not a valid email'),
            password: zod.string({
                required_error: 'Password is required',
            }),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Extract error messages
                const errorMessage = errorMessageFormatter(err)
                const errorResponse = {
                    code: httpStatus.FORBIDDEN,
                    message: errorMessage,
                };
                res.status(403).json(errorResponse); // Changed to 403 Forbidden
            } else {
                next(err); // Pass any unexpected errors to the error handling middleware
            }
        }
    }

    stripePaymentDataValidation = (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            product_name: zod.string({
                required_error: 'Product name is required!',
                invalid_type_error: 'Product name must be a string!'
            }),
            price: zod.number({
                required_error: 'Product price is required!',
                invalid_type_error: 'Product price must be a number'
            }),
            quantity: zod.number({
                required_error: 'Quantity is required!',
                invalid_type_error: 'Quantity must be a string!'
            }),
            success_url: zod.string({
                required_error: 'Success URL is required!',
                invalid_type_error: 'Success URL must be a string'
            }),
            cancel_url: zod.string({
                required_error: 'Cancel URL is required!',
                invalid_type_error: 'Success URL must be a string'
            })
        })

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Extract error messages
                console.log("errors", err.errors);
                let errorMessage = errorMessageFormatter(err)
                const errMessage = responseHandler.returnValidationError(httpStatus.FORBIDDEN, errorMessage)
                res.status(403).json(errMessage.response); // Changed to 403 Forbidden
            } else {
                next(err); // Pass any unexpected errors to the error handling middleware
            }
        }
    }
}