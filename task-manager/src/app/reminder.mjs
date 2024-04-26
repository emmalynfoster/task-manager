import {db} from '../database/db.mjs';

export class Note {

    #id
    #note

    constructor (id, note) {
        this.#id = id;
        this.#note = note;
    }

    static async create(data){
        if ((data !== undefined) && (data instanceof Object) 
        && (data.note !== undefined) && (typeof data.note == 'string')) {

            try {
                let db_result = await db.run('Insert into reminders values (NULL, ?)', data.note);
                let task = new Task(db_result.lastID, data.note);
                return task;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAllIDs(){
        try {
            let rows = await db.all('Select id from reminders');
            return rows.map(r => r.id);
        } 
        catch (e) { return []; }
    }

    static async getAllReminders(){
        let reminders = [];
        try {
            for (id in getAllIDs()){
                reminders.push(getTask(id));
            }
            return reminders;
        }
        catch (e) { return []; }
    }

    static async getTask(id){
        try {
            let row = await db.get('Select * from reminders where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Task(row.id, row.note);
            }
        } 
        
        catch (e) { return null; }
    }

    static async deleteReminder(id){
        try {
            await db.run('Delete from reminders where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Getters

    getID(){
        return this.#id;
    }

    getNote(){
        return this.#note;
    }

    json() {
        return {
            id: this.#id,
            note: this.#note
        }
    }

    // Setters

    async setTitle(new_note) {
        try {
            await db.run('Update reminders set note = ? where id = ?', new_note, this.#id);
            this.#note = new_note;
            return true;
        } catch (e) {
            return false;
        }
    }
}