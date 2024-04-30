import express from 'express';
import bodyParser from 'body-parser';
import { Task } from '../task-manager/src/app/task.mjs'
import { Reminder } from '../task-manager/src/app/reminder.mjs';
import { User } from '../task-manager/src/app/user.mjs';

const app = express()
const port = 3000

app.use(bodyParser.json())

//Adding cores headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// TASK API

// Retrieve array of all tasks

app.get('/tasks', async (req, res) => {
    let result = await Task.getAllTasks();
    res.json(result.map((task)=> task.json()));
})

app.get('/tasks/school', async (req, res) => {
    let result = await Task.getAllSchool();
    res.json(result.map((task)=> task.json()));
})

app.get('/tasks/home', async (req, res) => {
    let result = await Task.getAllHome();
    res.json(result.map((task)=> task.json()));
})

app.get('/tasks/all', async (req, res) => {
    let result = await Task.getAllIDs();
    res.json(result);
})

app.get('/tasks/work', async (req, res) => {
    let result = await Task.getAllWork();
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

app.put('/reminders', async (req, res) => {
    let reminder = await Reminder.create(req.params.id);
    if (reminder !== null) {
        if (req.body !== undefined){
            let new_reminder = await reminder.setNote(req.body.note);
            res.status(200).json(new_reminder.json());
    }
    else { res.status(400).send("Bad request"); }
}
})

app.delete('/reminders/:id', async (req, res) => {
    let deleted = await Reminder.deleteReminder(req.params.id)
    if(deleted){ res.status(200).send("Reminder deleted"); }
    else{ res.status(400).send("Delete failed"); }
})


// USERS API

//get user by name, return user json
app.get('/users/:name', async (req,res) => {
    let result = await User.getByName(req.params.name)
    if(result == null){ res.status(404).send("User not found")}
    else{ res.json(result.json()) }
})


// get user preference by name
// return 0 if user doesn't exist
// otherwise returns either 0 or 1 (how preference is stored)
app.get('/preference/:name', async (req, res) => {
    let result = await User.getByName(req.params.name)
    if( result == null ){ res.status(200).json({dark_mode: 0})}
    else{ res.status(200).json({dark_mode: result.getMode()}) }
})

// make a new user, sends error if a user by that name already exists
// expects form {name: {whatever the name is}, dark_mode: 0 or 1}
app.post('/users', async (req, res) => {
    if (await User.getByName(req.body.name)){
        res.status(400).send("Bad request, user already exists")
        return
    }
    let user = await User.create(req.body)
    if (! user){res.status(400).send("bad request")}
    else {res.status(201).json(user.json())}
})

// put user preference by name
//expects user preference in body either 0 or 1 as dark_mode
app.put('/users/:name', async (req, res) => {
    let user = await User.getByName(req.params.name)
    if (! user){
        res.status(404).send("user not found");
        return
    }
    
    user = await User.updatePreference(req.params.name, req.body.dark_mode)
    if(!user){
        res.status(400).send("Bad Request");
        return;
    }
    res.status(200).json(user.json())
})

app.listen(port, () => {
    console.log('Running...');
})