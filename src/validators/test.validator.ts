import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import zod, { ZodError } from 'zod';

export class TestValidator {

    testDataValidate = async (req: Request, res: Response, next: NextFunction) => {
        const dataSchema = zod.object({
            fullName: zod.string({
                required_error: 'Full name is required',
            }),
            email: zod.string({
                required_error: 'Email is required',
            })
                .email('Not a valid email'),
        });

        try {
            req.body = dataSchema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                // Extract error messages
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
}