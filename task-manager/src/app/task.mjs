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
            console.log(tasks[0])
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

    /*  This is not complete, as the function works right now it can result in unwanted behavior where if any field 
        can be updated but if another field fails, the valid ones will be updated in the table but the invalid ones 
        stay unchanged when ideally you would want all or nothing. The setters method themselves work but are missing
        validation.
        */
       // One way to fix this is by starting a transaction on the db which will only commit the changes if all the queriers go through

    async updateTask(data){
        //Begin the transaction
        db.run("BEGIN TRANSACTION");

        try {
            //Check that data is an Object
            if ((data !== undefined) && (data instanceof Object)) {

                /*We are now checking whether the person provided no value or the same value as before the update 
                If they did then we do not want that query to be in the transaction becasue it wont go through
                No need to check the type of the value becasue if it is the wrong type, the query will fail and the none 
                of the changes in the transaction will be commited*/
                if(data.title !== undefined && data.title !== this.#title) {
                    db.run('UPDATE tasks SET title = ? WHERE id = ?', data.title, this.id);
                    this.setTitle(data.title);
                } 
                
                if(data.description !== undefined && data.description !== this.#description) {
                    db.run('UPDATE tasks SET description = ? WHERE id = ?', data.description, this.id);
                    this.setDescription(data.desciption);
                }

                if(data.due_date !== undefined && data.due_date !== this.#due_date) {
                    db.run('UPDATE tasks SET due_date = ? WHERE id = ?', data.due_date, this.id);
                    this.setDueDate(data.due_date);
                }

                if(data.category !== undefined && data.category !== this.#category) {
                    db.run('UPDATE tasks SET category = ? WHERE id = ?', data.category, this.id);
                    this.setCategory(data.category);
                }

                if(data.completed !== undefined && data.completed !== this.#completed) {
                    db.run('UPDATE tasks SET complete = ? WHERE id = ?', data.complete, this.id);
                    this.setCompleted(data.completed);
                }
            } else {
                //If data is not an Object, return
                return;
            }

            //If there are no errors, commit all changes made during transaction and update the values in the object
            db.run("COMMIT");

        }

        catch (e) {
            //If there are any errors, rollback all the changes made in the transaction
            db.run("ROLLBACK");
            return;
        }

        return;
    }         
        
            // Ensure that new data is not undefined, is the correct type and does not match its current value to update
    //         if (data.title !== undefined && (typeof data.title == 'string') && data.title !== this.#title){
    //             this.setTitle(data.title);
    //         }

    //         if (data.description !== undefined && (typeof data.description == 'string') && data.description !== this.#description){
    //             this.setDescription(data.description);
    //         }

    //         if (data.due_date !== undefined && (typeof data.due_date == 'string') && data.due_date !== this.#due_date){
    //             this.setDueDate(data.due_date);
    //         }

    //         if (data.category !== undefined && (typeof data.category == 'string') && data.category !== this.#category && data.category in categories){
    //             this.setCategory(data.category);
    //         }

    //         if (data.completed !== undefined && Number.isInteger (data.completed) && data.completed !== this.#completed){
    //             this.setCompleted(data.completed);
    //         }

    //     }

    //     return;
    // }


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