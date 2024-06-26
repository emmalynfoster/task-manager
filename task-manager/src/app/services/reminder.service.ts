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

  createNote(note: string, checked: number) {
    return this.webRequestService.post('reminders', {note, checked});
  }

  updateChecked(id: number, checked: number) {
    return this.webRequestService.put('reminders/' + id, {checked});
  }

  deleteCheckedReminders(){
    return this.webRequestService.delete('reminders');
  }


}
