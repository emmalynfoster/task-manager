import {db} from '../../../database/db.mjs';

export class User{
    #id
    #name
    #dark_mode

    constructor(id, name, dark_mode){
        this.#id = id;
        this.#name = name;
        this.#dark_mode = dark_mode
    }

    getMode(){
        return this.#dark_mode
    }

    json(){
        return {
            id: this.#id,
            name: this.#name,
            dark_mode: this.#dark_mode
        }
    }

    static async create(data){
        if ((data !== undefined) && (data instanceof Object) 
        && (data.name !== undefined) && (typeof data.name == 'string')
        && (data.dark_mode !== undefined) && (data.dark_mode in [0,1])) {

            try {
                let db_result = await db.run('Insert into users values (NULL, ?, ?)', data.name, data.dark_mode);
                let user = new User(db_result.lastID, data.nanme, data.dark_mode);
                return user;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getByID(id){
        try{
            let row = await db.get('SELECT * FROM users WHERE id = ?', id)
            if(! row){
                return null;
            }
            return new User(row.id, row.name, row.dark_mode)
        } catch(e){
            return null
        }
    }

    static async getByName(name){
        try{
            let row = await db.get('SELECT * FROM users WHERE name = ?', id)
            if (! row){
                return null;
            }
            return new User(row.id, row.name, row.dark_mode)
        } catch (e) {
            return null
        }
    }

    static async updatePreference(name, mode){
        try{
                db.run('UPDATE users SET dark_mode = ? WHERE name = ?', mode, name)
                return "success"
        } catch (e){
            return null
        }
    }
}