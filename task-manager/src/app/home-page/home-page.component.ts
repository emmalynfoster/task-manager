import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { TaskCardWidget } from '../task-card/task-card.widget';
import { SharedModule } from '../shared.module';
import { RemindersWidget } from '../reminders/reminders.widget';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskCardWidget, SharedModule, RemindersWidget],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public static Route: Route = {path: 'tasks', component: HomePageComponent};
  public category1: number[];
  public category2: number[];
  public category3: number[];


  constructor(private taskService: TaskService){
    this.category1 = [1,2,3,4,5,6];
    this.category2 = [1,2,3];
    this.category3 = [1,2,3];
  }

}
