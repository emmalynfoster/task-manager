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
    this.reminders = ["Project due soon", "Do laundry", "Meeting 4/29", "hello my name is"];
  }
}
