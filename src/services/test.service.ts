import { Request } from 'express';
import responseHandler from './../helpers/responseHandler.ts';
import httpStatus from 'http-status';

export class TestService {
    constructor() {

    }

    getTestData = async (req: Request) => {
        try {
            let message = 'Test data successfully fetched!';
            console.log(req)
            return responseHandler.returnSuccess(httpStatus.OK, message, req.body);
        } catch (e) {
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }
}