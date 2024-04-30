import {db} from '../../../database/db.mjs';

export class Reminder {

    #id
    #note
    #checked

    constructor (id, note, checked) {
        this.#id = id;
        this.#note = note;
        this.#checked = checked;
    }

    static async create(data){
        if ((data !== undefined) && (data instanceof Object) 
        && (data.note !== undefined) && (typeof data.note == 'string')
        && (data.checked !== undefined) && (data.checked in [0, 1])) {

            try {
                let db_result = await db.run('Insert into reminders values (NULL, ?, ?)', data.note, data.checked);
                let reminder = new Reminder(db_result.lastID, data.note, data.checked);
                return reminder;
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
            reminders = await db.all("SELECT * FROM reminders")
            return reminders.map((item) => new Reminder(item.id, item.note, item.checked));
        }
        catch (e) { return []; }
    }

    static async getReminder(id){
        try {
            let row = await db.get('Select * from reminders where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Reminder(row.id, row.note, row.checked);
            }
        } 
        
        catch (e) { return null; }
    }

    static async getCheckedReminders() {
        try {
            let row = await db.all('SELECT * from reminders where checked = 1');
            if(!row) {
                return null;
            } else {
                return row.map((reminder) => new Reminder(reminder.id, reminder.note, reminder.checked));
            }
        }
        catch (e) { return null; }
    }

    static async deleteCheckedReminders(){
        try {
            await db.run('Delete from reminders where checked = 1');
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
            note: this.#note,
            checked: this.#checked
        }
    }

    // Setters

    async setChecked(checked) {
        try {
            await db.run('UPDATE reminders set checked = ? where id = ?', checked, this.#id);
            this.#checked = checked;
            return true;
        } catch (e) {
            return false;
        }
    }
}