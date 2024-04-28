import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { TaskCardWidget } from '../task-card/task-card.widget';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskCardWidget],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public static Route: Route = {path: 'mytasks', component: HomePageComponent};
}
