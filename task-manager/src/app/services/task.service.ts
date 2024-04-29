import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  //Get all tasks in database
  getTasks() {
    return this.webRequestService.get('tasks');
  }

  //Create a new task using webRequestService.post
  createTask(title: string, description: string, due_date: string, complete: number, category: string) {
    // send a web request to create a task
    return this.webRequestService.post('tasks', {title, description, due_date, complete, category});
  }

  //use webRequestService.put method to update task **Not complete
  //Also not sure how to implement beacsue we need the task id 
  updateTask(title ?: string, description ?: string, due_date ?: string, complete ?: number, category ?: string) {
    return this.webRequestService.put('tasks', {title, description, due_date, complete, category});
  }

  //I'm not sure how to implement this one becasue we need to have the task id sent to 
  deleteTask() {
    //Needs implementation
  }


}
