import {db} from '../database/db.mjs';
import { Task } from './task.mjs';

export class User {

    #username
    #email
    #password
    #dark_mode

    constructor(username, email, password, dark_mode) {
        this.#username = username;
        this.#email = email;
        this.password = password;
        this.#dark_mode = dark_mode;
    }

    static async create (data) {
        if ((data !== undefined) && (data instanceof Object) 
            && (data.username != undefined) && (data.email != undefines)
            && (data.password != undefined) && (data.dark_mode !== undefined)) {
                try {
                    await db.run('INSERT INTO users values (?, ?, ?, ?)', data.username, data.email, data.password, data.dark_mode);
                    let task = new Task(data.username, data.email, data.password, data.dark_mode);
                    return task;
                } catch (e) {
                    return null;
                }
            }
    }
}