import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { IGenerateTokenPayload } from './../interfaces/auth.interface.ts';
import responseHandler from './../helpers/responseHandler.ts';

declare global {
    namespace Express {
        interface Request {
            userInfo?: any;
        }
    }
}


const varifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            const response = responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Access Token Required!')
            return res.status(response.statusCode).json(response.response);
        }

        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                const response = responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid or Expired Token!')
                return res.status(response.statusCode).json(response.response);
            }

            // If the token is valid, attach the decoded user information to the request object
            req.userInfo = user;
            next();
        });
    } catch (e) {
        console.log("==varifyToken====", e)
    }
}

export default varifyToken;