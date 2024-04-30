import { Component, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';
import { ReminderService } from '../services/reminder.service';

@Component({
  selector: 'reminders-widget',
  standalone: true,
  imports: [SharedModule, MatCheckbox],
  templateUrl: './reminders.widget.html',
  styleUrl: './reminders.widget.css'
})
export class RemindersWidget {
  @Input() reminders!: any[];


  constructor(private router: Router, private reminderService: ReminderService){
  }

  navigateToEdit(): void {
    this.router.navigate(['/reminders/editor']);
  }

  addReminder(){}

  //tell parent to delete reminders
  deleteCompleted(){
    this.reminderService.deleteCheckedReminders().subscribe({
      next: () =>  (this.reminderService.getReminders().subscribe())
    });
  }
}
