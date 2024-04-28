import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Route } from '@angular/router';

@Component({
  selector: 'reminders-widget',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reminders.widget.html',
  styleUrl: './reminders.widget.css'
})
export class RemindersWidget {
  public static Route: Route = {path: '', component: RemindersWidget};
  public reminders: string[];

  constructor(){
    this.reminders = ["Project due soon", "Do laundry", "Meeting 4/29"];
  }

  toggleCompletion(index: number){
    // Toggle completion status of the reminder at the given index
    if (index >= 0 && index < this.reminders.length) {
      // Use splice to update the array in place
      this.reminders.splice(index, 1, this.reminders[index].startsWith('✓ ') ? this.reminders[index].substring(2) : '✓ ' + this.reminders[index]);
    }
  }
}
