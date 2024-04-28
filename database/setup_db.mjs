import {db} from './db.mjs'

//creating the tasks database

await db.run(`CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, description TEXT, 
                due_date TEXT NOT NULL CHECK (due_date LIKE '____-__-__'),
                complete BOOLEAN NOT NULL CHECK (complete IN (0, 1)),
                category TEXT NOT NULL CHECK (category IN ('HOME', 'WORK', 'SCHOOL'))`);

await db.run('CREATE TABLE reminders (id INTEGER PRIMARY KEY, note TEXT)');

await db.run(`CREATE TABLE users (username TEXT PRIMARY KEY, email TEXT NOT NULL, password TEXT NOT NULL, dark_mode BOOLEAN CHECK (boolean IN (0, 1)))`);

db.close();