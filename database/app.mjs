import express from 'express';
import bodyParser from 'body-parser';
import { Task } from '../task-manager/src/app/task.mjs'
import { Reminder } from '../task-manager/src/app/reminder.mjs';
import { User } from '../task-manager/src/app/user.mjs';

const app = express()
const port = 3000

app.use(bodyParser.json())

// TASK API

// Retrieve array of all tasks

app.get('/tasks', async (req, res) => {
    let result = await Task.getAllTasks();
    res.json(result.map((task)=> task.json()));
})

app.get('/tasks/:id', async (req, res) => {
    let result = await Task.getTask(req.params.id);
    if (result == null){ res.status(404).send("Task not found"); }
    else { res.json(result.json()); }
})

app.post('/tasks', async (req, res) => {
    let task = await Task.create(req.body);
    if(!task) { res.status(400).send("Bad request"); }
    else{ res.status(201).json(task.json()); }
})

app.put('/tasks/:id', async (req, res) => {
    let task = await Task.getTask(req.params.id);
    if (task !== null) {
        if (req.body !== undefined){
            let new_task = await task.updateTask(req.body);
            res.status(200).json(new_task.json());
    }
    else { res.status(400).send("Bad request"); }
}
})

app.delete('/tasks/:id', async (req, res) => {
    let deleted = await Task.deleteTask(req.params.id)
    if (deleted){ res.status(200).send("Task deleted"); }
    else{ res.status(400).send("Delete failed"); }
})


// REMINDER API
app.get('/reminders', async (req, res) => {
    let result = await Reminder.getAllReminders();
    res.json(result.map((reminder)=> reminder.json()));
})

app.get('/reminders/:id', async (req, res) => {
    let result = await Reminder.getReminder(req.params.id);
    if (result == null){ res.status(404).send("Task not found"); }
    else { res.json(result.json()); }
})

app.post('/reminders', async (req, res) => {
    let reminder = await Reminder.create(req.body);
    if(!reminder) { res.status(400).send("Bad request"); }
    else { res.status(201).json(reminder.json()); }
})

app.delete('/reminders/:id', async (req, res) => {
    let deleted = await Reminder.deleteReminder(req.params.id)
    if(deleted){ res.status(200).send("Reminder deleted"); }
    else{ res.status(400).send("Delete failed"); }
})

app.get('/users/:id', async (req,res) => {
    let result = await User.getByID(req.params.id)
    if(result == null){ res.status(404).send("User not found")}
    else{ res.json(user.json()) }
})

app.get('/preference', async (req, res) => {
    let result = await User.getByName(req.query.name)
    if( result == null ){res.status(404).send("User not found")}
    else{ res.send(result.getMode()) }
})

app.listen(port, () => {
    console.log('Running...');
})