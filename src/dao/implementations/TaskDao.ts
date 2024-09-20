import { IAuthDao } from "../contracts/IAuthDao.ts";
import { SuperDao } from "./SuperDao.ts";

export class TaskDao extends SuperDao<'task'> implements IAuthDao {
    constructor() {
        super('task');
    }
}