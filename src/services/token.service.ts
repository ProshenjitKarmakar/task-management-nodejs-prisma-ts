import { NextFunction, Response, Request } from 'express';
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

export class TokenService {
    private secret: string | undefined;
    private expire: string | undefined
    constructor() {
        this.secret = process.env.JWT_SECRET as string;
        this.expire = process.env.JWT_EXPIRE as string
    }

    generateToken = async (payload: IGenerateTokenPayload, expire: string | undefined = this.expire) => {
        const options = {
            expiresIn: expire,

            // Option to specify the audience (usually the intended recipients of the token)
            audience: 'user',

            // Option to specify the issuer (who created the token)
            issuer: 'proshenjit',

            // Option to specify a subject (usually the principal for which the token is about)
            subject: 'user_authentication_token',

            // Option to set a JWT ID (a unique identifier for the token)
            jwtid: 'pro-123',
        };

        const token = jwt.sign(payload, this.secret as string, options);
        return token;
    }
}
