import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { TaskService } from './../services/task.service.ts';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    addTask = async (req: Request, res: Response) => {
        try {
            const data = await this.taskService.addTask(req);
            res.status(data.statusCode).send(data.response);
        } catch (e) {
            console.log("===e===", e)
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    };
}
