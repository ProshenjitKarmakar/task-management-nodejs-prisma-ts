import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import zod, { ZodError } from 'zod';

export class UserValidator {

    createUserValidator = async (req: Request, res: Response, next: NextFunction) => {
        const userSchema = zod.object({
            name: zod.string({
                required_error: 'Name is required',
            }),
            email: zod.string({
                required_error: 'Email is required',
            })
                .email('This is not a valid email!'),
        })

        try {
            req.body = userSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errorMessage = err.errors.map((e) => e.message).join(', ');
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

    updateUserValidator = async (req: Request, res: Response, next: NextFunction) => {
        const userSchema = zod.object({
            id: zod.number({
                required_error: 'ID is required',
            }),
            name: zod.string({
                required_error: 'Name is required',
            }),
            email: zod.string({
                required_error: 'Email is required',
            })
                .email('This is not a valid email!'),
        })

        try {
            req.body = userSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errorMessage = err.errors.map((e) => e.message).join(', ');
                const errorResponse = {
                    code: httpStatus.FORBIDDEN,
                    message: errorMessage,
                };
                res.status(403).json(errorResponse);
            } else {
                next(err);
            }
        }
    }

    deleteUserValidator = async (req: Request, res: Response, next: NextFunction) => {
        const userSchema = zod.object({
            id: zod.number({
                required_error: 'ID is required',
            }),
        })

        try {
            req.body = userSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const errorMessage = err.errors.map((e) => e.message).join(', ');
                const errorResponse = {
                    code: httpStatus.FORBIDDEN,
                    message: errorMessage,
                };
                res.status(403).json(errorResponse);
            } else {
                next(err);
            }
        }
    }
}