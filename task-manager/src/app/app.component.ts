import { Component } from '@angular/core';
import { TaskCardWidget } from './task-card/task-card.widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskCardWidget],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';
}
