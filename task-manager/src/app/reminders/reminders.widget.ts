import { Component, Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
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


  id: number = -1

  constructor(private router: Router, 
    private reminderService: ReminderService, 
    private route: ActivatedRoute){
      this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.reminderService.getReminders().subscribe({
      next: (reminders) => (this.reminders = reminders)
    });
  }

  navigateToEdit(): void {
    this.router.navigate(['/reminders/editor']);
  }

  //tell parent to delete reminders
  deleteCompleted() {
    this.reminderService.deleteCheckedReminders().subscribe({
      next: () =>  (this.reminderService.getReminders().subscribe({
        next: (reminders) => (this.reminders = reminders)
      }))
    });
  }

  updateReminderChecked(event: MatCheckboxChange) {
    let checked: number = event.checked ? 1 : 0;
    this.reminderService.updateChecked(this.id, checked).subscribe({
      next: () =>  (this.reminderService.getReminders().subscribe({
        next: (reminders) => (this.reminders = reminders)
      }))
    });
  }
}
