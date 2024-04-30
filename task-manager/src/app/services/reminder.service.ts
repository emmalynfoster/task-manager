import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private webRequestService: WebRequestService) { }

  //Get all tasks in database
  getReminders() {
    return this.webRequestService.get('reminders');
  }
}
