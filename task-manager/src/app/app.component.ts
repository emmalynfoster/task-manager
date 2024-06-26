import { Component } from '@angular/core';
import { TaskCardWidget } from './task-card/task-card.widget';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DarkModeService } from './app-dark-mode-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, TaskCardWidget],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager';

  constructor(public darkModeService: DarkModeService){}
}
