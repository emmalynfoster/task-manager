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

  //Get all tasks in database
  getTask(id ?: number) {
    return this.webRequestService.get('tasks/' + id);
  }

  //Create a new task using webRequestService.post
  createTask(title: string, description: string, due_date: string, complete: number, category: string) {
    // send a web request to create a task
    return this.webRequestService.post('tasks', {title, description, due_date, complete, category});
  }

  //use webRequestService.put method to update task 
  updateTask(id ?: number, title ?: string, description ?: string, due_date ?: string, complete ?: number, category ?: string) {
    return this.webRequestService.put('tasks/' + id, {title, description, due_date, complete, category});
  }

  // 
  deleteTask(id ?: number) {
    return this.webRequestService.delete('tasks/' + id);
  }
}
