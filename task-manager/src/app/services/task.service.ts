import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  //Get all tasks in database
  getAllTasks() {
    return this.webRequestService.get('tasks');
  }

  getAllSchool() {
    return this.webRequestService.get('tasks/school');
  }

  getAllHome() {
    return this.webRequestService.get('tasks/home');
  }

  getAllWork() {
    return this.webRequestService.get('tasks/work');
  }

  getAllIDs() {
    return this.webRequestService.get('tasks/all');
  }

  //Get a task by id
  getTaskById(id: number) {
    return this.webRequestService.get('tasks/' + id);
  }

  //Create a new task using webRequestService.post
  createTask(title: string, due_date: string, description: string, completed: number, category: string) {
    console.log({title, due_date, description, completed, category});
    // send a web request to create a task
    return this.webRequestService.post('tasks', {title, due_date, description, completed, category});
  }


  //use webRequestService.put method to update task **Not complete
  //Also not sure how to implement beacsue we need the task id 
  updateTask(id: number, title : string, due_date : string, description : string, completed : number, category : string) {
    return this.webRequestService.put('tasks/' + id, {title, due_date, description, completed, category});
  }

  deleteTask(id: number) {
    return this.webRequestService.delete('tasks/' + id);
  }
}
