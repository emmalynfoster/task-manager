import express from 'express';
import bodyParser from 'body-parser';
import { Task } from '../task-manager/src/app/task.mjs'
import { Reminder } from '../task-manager/src/app/reminder.mjs';

const app = express()
const port = 3000

app.use(bodyParser.json())

// TASK API

// retrieve array of all tasks
app.get('/tasks', async (req, res) => {
    let result = await Task.getAllTasks()
    res.json(result.map((task)=> task.json()))
})

app.get('/tasks/:id', async (req, res) => {
    let result = await Task.getTask(req.params.id)
    res.json(result.json())
})

app.post('/tasks', async (req, res) => {
    let task = await Task.create(req.body);

    if(!task) {
        res.status(400).send("bad request");
        return;
    }
    
    res.status(201).json(task.json())

})

app.listen(port, () => {
    console.log('Running...');
})

// REMINDER API
