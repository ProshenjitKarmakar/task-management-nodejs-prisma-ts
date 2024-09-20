import { IAuthDao } from "../contracts/IAuthDao.ts";
import { SuperDao } from "./SuperDao.ts";

export class AuthDao extends SuperDao<'user'> implements IAuthDao {
    constructor() {
        super('user');
    }
}