import {db} from '../../../database/db.mjs';

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

    static categories = {
        HOME: "HOME",
        WORK: "WORK",
        SCHOOL: "SCHOOL"
      };

    static async create(data){
        // Ensure all data is defined, correct type and that category and completed are valid options
        if ((data !== undefined) && (data instanceof Object) 
        && (data.title !== undefined) && (data.description !== undefined)
        && (data.due_date !== undefined) && (data.category !== undefined)
        && (data.completed !== undefined) && (typeof data.title == 'string')
        && (typeof data.description == 'string') && (typeof data.due_date == 'string')
        && (typeof data.category == 'string') && (data.completed in [0,1]) 
        && data.category in Task.categories) {
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
            let rows = (await db.all('SELECT id FROM tasks'));
            return rows.map((r) => r.id);
        } 
        catch (e) { 
            return []; }
    }

    static async getAllTasks(){
        let tasks = [];
        try {
            tasks = await db.all("SELECT * from tasks")
            return tasks.map((item)=> new Task(item.id, item.title, item.description, item.due_date, item.complete, item.category));
        }
        catch (e) { return []; }
    }

    static async getAllSchool(){
        let tasks = [];
        try {
            tasks = await db.all("SELECT * from tasks Where category == 'SCHOOL'")
            return tasks.map((item)=> new Task(item.id, item.title, item.description, item.due_date, item.complete, item.category));
        }
        catch (e) { return []; }
    }

    static async getAllHome(){
        let tasks = [];
        try {
            tasks = await db.all("SELECT * from tasks Where category == 'HOME'")
            return tasks.map((item)=> new Task(item.id, item.title, item.description, item.due_date, item.complete, item.category));
        }
        catch (e) { return []; }
    }

    static async getAllWork(){
        let tasks = [];
        try {
            tasks = await db.all("SELECT * from tasks Where category == 'WORK'")
            return tasks.map((item)=> new Task(item.id, item.title, item.description, item.due_date, item.complete, item.category));
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

    async updateTask(data){
        // Begin the transaction
        await db.run("BEGIN TRANSACTION");

        try {
            // Check that data is an Object 
            if ((data !== undefined) && (data instanceof Object)) {
                
                if(data.title !== undefined && data.title !== this.#title) {
                    await db.run('UPDATE tasks SET title = ? WHERE id = ?', data.title, this.#id);
                    this.setTitle(data.title);
                } 
                
                if(data.description !== undefined && data.description !== this.#description) {
                    await db.run('UPDATE tasks SET description = ? WHERE id = ?', data.description, this.#id);
                    this.setDescription(data.description);
                }

                if(data.due_date !== undefined && data.due_date !== this.#due_date) {
                    await db.run('UPDATE tasks SET due_date = ? WHERE id = ?', data.due_date, this.#id);
                    this.setDueDate(data.due_date);
                }

                if(data.category !== undefined && data.category !== this.#category) {
                    await db.run('UPDATE tasks SET category = ? WHERE id = ?', data.category, this.#id);
                    this.setCategory(data.category);
                }

                if(data.completed !== undefined && data.completed !== this.#completed) {
                    await db.run('UPDATE tasks SET complete = ? WHERE id = ?', data.completed, this.#id);
                    this.setCompleted(data.completed);
                }
            } 
            
            else { 
                db.run("ROLLBACK");
                return null;
            }
    
            await db.run("COMMIT");
            return this;
        }

        catch (e) {
            //If there are any errors, rollback all the changes made in the transaction
            db.run("ROLLBACK");
            return null;
        }
    }       
    
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

    // Setters no need for the db queries in here anymore

    async setTitle(new_title) {
        this.#title = new_title;
        return;
    }

    async setDescription(new_description) {
        this.#description = new_description;
        return;
    }

    async setDueDate(new_due_date) {
        this.#due_date = new_due_date;
        return;
       
    }

    async setCompleted(new_completed) {
        this.#completed = new_completed;
        return;
    }

    async setCategory(new_category) {
        this.#category = new_category;
        return true;
    }
}