import { Component } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'reminders-widget',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reminders.widget.html',
  styleUrl: './reminders.widget.css'
})
export class RemindersWidget {
  public reminders: string[];

  constructor(private router: Router){
    this.reminders = ["Project due soon", "Do laundry", "Meeting 4/29", "hello my name is"];
  }

  navigateToEdit(): void {
    this.router.navigate(['/reminders/editor']);
  }
}
