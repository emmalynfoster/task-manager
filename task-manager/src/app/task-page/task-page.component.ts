import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { TaskCardWidget } from '../task-card/task-card.widget';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [TaskCardWidget],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent {
  public static Route: Route = {path: 'mytasks', component: TaskPageComponent};
}
