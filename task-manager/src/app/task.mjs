import {db} from '../database/db.mjs';

export class Task {

    #id
    #title
    #description
    #due_date
    #completed
    #category

    constructor (id, title, description, due_date, completed, category) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#due_date = due_date;
        this.#completed = completed;
        this.#category = category;
    }

    categories = {
        HOME: "Home",
        WORK: "Work",
        SCHOOL: "School"
      };

    static async create(data){
        // Ensure all data is defined, correct type and that category and completed are valid options
        if ((data !== undefined) && (data instanceof Object) 
        && (data.title !== undefined) && (data.description !== undefined)
        && (data.due_date !== undefined) && (data.category !== undefined)
        && (data.completed !== undefined) && (typeof data.title == 'string')
        && (typeof data.description == 'string') && (typeof data.due_date == 'string')
        && (typeof data.category == 'string') && (data.completed in [0,1]) 
        && data.category in categories) {

            try {
                let db_result = await db.run('Insert into tasks values (NULL, ?, ?, ?, ?, ?)', data.title, data.description, data.due_date, data.completed, data.category);
                let task = new Task(db_result.lastID, data.title, data.description, data.due_date, data.completed, data.category);
                return task;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    static async getAllIDs(){
        try {
            let rows = await db.all('Select id from tasks');
            return rows.map(r => r.id);
        } 
        catch (e) { return []; }
    }

    static async getAllTasks(){
        let tasks = [];
        try {
            for (id in getAllIDs()){
                tasks.push(getTask(id))
            }
            return tasks;
        }
        catch (e) { return []; }
    }

    static async getTask(id){
        try {
            let row = await db.get('Select * from tasks where id = ?', id);
            if (!row) {
                return null;
            } else {
                return new Task(row.id, row.title, row.description, row.due_date, row.complete, row.category);
            }
        } 
        
        catch (e) { return null; }
    }

    /*  This is not complete, as the function works right now it can result in unwanted behavior where if any field 
        can be updated but if another field fails, the valid ones will be updated in the table but the invalid ones 
        stay unchanged when ideally you would want all or nothing. The setters method themselves work but are missing
        validation.

    updateTask(data){
        if ((data !== undefined) && (data instanceof Object)) {

            // Ensure that new data is not undefined, is the correct type and does not match its current value to update
            if (data.title !== undefined && (typeof data.title == 'string') && data.title !== this.#title){
                this.setTitle(data.title);
            }

            if (data.description !== undefined && (typeof data.description == 'string') && data.description !== this.#description){
                this.setDescription(data.description);
            }

            if (data.due_date !== undefined && (typeof data.due_date == 'string') && data.due_date !== this.#due_date){
                this.setDueDate(data.due_date);
            }

            if (data.category !== undefined && (typeof data.category == 'string') && data.category !== this.#category && data.category in categories){
                this.setCategory(data.category);
            }

            if (data.completed !== undefined && Number.isInteger (data.completed) && data.completed !== this.#completed){
                this.setCompleted(data.completed);
            }

        }

        return;
    }
    */

    static async deleteTask(id){
        try {
            await db.run('Delete from tasks where id = ?', id);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Getters

    getID(){
        return this.#id;
    }

    getTitle(){
        return this.#title;
    }

    getDescription(){
        return this.#description;
    }

    getDueDate(){
        return this.#due_date;
    }

    getCategory(){
        return this.#category;
    }

    getCompleted(){
        return this.#completed;
    }

    json() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            due_date: this.#due_date,
            completed: this.#completed,
            category: this.#category
        }
    }

    // Setters

    async setTitle(new_title) {
        try {
            await db.run('Update tasks set title = ? where id = ?', new_title, this.#id);
            this.#title = new_title;
            return true;
        } catch (e) {
            return false;
        }
    }

    async setDescription(new_description) {
        try {
            await db.run('Update tasks set description = ? where id = ?', new_description, this.#id);
            this.#description = new_description;
            return true;
        } catch (e) {
            return false;
        }
    }

    async setDueDate(new_due_date) {
        try {
            await db.run('Update tasks set due_date = ? where id = ?', new_due_date, this.#id);
            this.#due_date = new_due_date;
            return true;
        } catch (e) {
            return false;
        }
    }

    async setCompleted(new_completed) {
        try {
            await db.run('Update tasks set complete = ? where id = ?', new_completed, this.#id);
            this.#completed = new_completed;
            return true;
        } catch (e) {
            return false;
        }
    }

    async setCategory(new_category) {
        try {
            await db.run('Update tasks set category = ? where id = ?', new_category, this.#id);
            this.#category = new_category;
            return true;
        } catch (e) {
            return false;
        }
    }
}