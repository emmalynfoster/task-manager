# Task Manager Project

_Written by: Emmalyn Foster <br>
Last Updated: 4/23/2024_

This project encompasses a task manager, including the ability to create, complete, edit, and delete tasks for certain categories. 
It also includes a to-do list feature for more general tasks, with the ability to create and delete as to-dos are completed. 

## Demo Video
https://youtu.be/5liUdQGAo-I

## Codebase
This application will be implemented in Angular and Javascript, using HttpClient in the Frontend Service and an SQLite database.  <br>
<br>
A good resource for reference for the frontend is the CSXL website, which utilizes Angular. <br>
<a href="https://github.com/unc-csxl/csxl.unc.edu">CSXL Repository</a>

## Technical Requirements
- `Task Object File`:
    - This creates the object model for storing individual tasks entries in the database.
    - These will be organized by category
    - Includes object services 
- `To-do List Object File`:
    - This creates the object model for storing more general to-do item entries in the database.
    - Includes object services
- Corresponding services encapsulated within the object for creating, adding, deleting, getting, and updating each entry as mentioned.
- Corresponding APIs for calling backend services.
- UI:
    - Singular page for displaying tasks by category
    - To-do list widget to be displayed on this page
    - Widgets for displaying each task card by category
- Any necessary routing

_More details on requirements in Issues_

## Wireframes

![Screenshot 2024-04-24 132726](https://github.com/emmalynfoster/task-manager/assets/111466810/ae7bb826-177e-4824-9d6a-c3a12e7edc33)
![Screenshot 2024-04-24 132747](https://github.com/emmalynfoster/task-manager/assets/111466810/6a0c0723-ecc2-4c2c-956b-1650991e723f)


## Workflow 
For the purpose of this project, main will remain a protected branch. It should only be merged into if the corresponding subtask branch is completely functional, or risk damaging the health of the codebase. To help prevent this, subtasks branches will be pre-determined for each issue. Work-in-progress (WIP) branches will be created by every individual working on said subtask branch, with the subtask branch as the parent branch. After each feature is implemented, a Pull Request will be made for other team members to view and approve before a merge is made. It is also good practice to `squash and merge` and delete the WIP branch when merging. 

_Try not to merge Pull Requests yourself!_

It is also important to have consistent naming to keep track of workflow. <br>
For example, if there is a branch subtask-1, a good name would look like: subtask1-wip-my-name-feature <br>
Feature could mean any aspect of that subtask you are currently working on, but most likely not necessary if you are working on the entire subtask, given it is a small one. 

