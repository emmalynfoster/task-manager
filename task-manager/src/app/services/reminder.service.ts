import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private webRequestService: WebRequestService) { }

  //Get all reminders in database
  getReminders() {
    return this.webRequestService.get('reminders');
  }

  getReminder(id: number) {
    return this.webRequestService.get('reminders/' + id);
  }

  createNote(note: string) {
    return this.webRequestService.post('reminders', {note});
  }

  updateNote(id: number, note: string) {
    return this.webRequestService.put('reminders/' + id, {note});
  }

  deleteNote(id: number){
    return this.webRequestService.delete('reminders/' + id);
  }


}
