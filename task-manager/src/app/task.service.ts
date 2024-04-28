import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  createTask(title: string, description: string, due_date: string, complete: number, category: string) {
    // send a web request to create a task
    return this.webRequestService.post('tasks', {title, description, due_date, complete, category});
  }
}
