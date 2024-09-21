import { ITaskDao } from "../contracts/ITaskDao.ts";
import { SuperDao } from "./SuperDao.ts";

export class TaskDao extends SuperDao<'task'> implements ITaskDao {
    constructor() {
        super('task');
    }
}