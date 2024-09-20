import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TestService } from './../services/test.service.ts';

export class TestController {
    private testService: TestService;

    constructor() {
        this.testService = new TestService();
    }

    userProfileUpdate = async (req: Request, res: Response) => {
        try {
            const data = await this.testService.getTestData(req);
            res.status(data.statusCode).send(data.response);
        } catch (e) {
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}
