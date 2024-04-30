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
  @Input() reminder!: any;

  //public reminders: {text: string, checked: boolean}[];
  reminders!: any[];

  ngOnInit() {
    this.reminderService.getReminders().subscribe({
      next: (reminders) => (this.reminders = reminders)
    });
  }

  constructor(private router: Router, private reminderService: ReminderService){
    // this.reminders = [
    //   { text: "Project due soon", checked: false },
    //   { text: "Do laundry", checked: false },
    //   { text: "Meeting 4/29", checked: false },
    //   { text: "hello my name is", checked: false }
    // ];
  }

  navigateToEdit(): void {
    this.router.navigate(['/reminders/editor']);
  }

  addReminder(){}

  //tell parent to delete reminders
  // deleteCompleted(){
  //   this.reminders = this.reminders.filter(reminder => !reminder.checked);
  // }
}
