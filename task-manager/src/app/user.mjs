import {db} from '../database/db.mjs';
import { Task } from '../task.mjs';
import { jsonwebtoken } from '../../node_modules/jsonwebtoken';

export class User {

    #email
    #password
    #sessions

    constructor(email, password, dark_mode) {
        this.#email = email;
        this.#password = password;
        this.#sessions = sessions;
    }

    static async create (data) {
        // we will add the sessions in a different method
        if ((data !== undefined) && (data instanceof Object) 
            && (data.username != undefined) && (data.email != undefines)
            && (data.password != undefined)) {
                try {
                    await db.run('INSERT INTO users values (?, ?)', data.email, data.password);
                    let task = new Task(data.email, data.password);
                    return task;
                } catch (e) {
                    return null;
                }
            }
    }
}