import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { TaskCardWidget } from '../task-card/task-card.widget';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskCardWidget],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private taskService: TaskService) { }
  public static Route: Route = {path: '', component: HomePageComponent};

  createNewTask() {
    this.taskService.createTask("Comp 426", "finish final project", "2024-04-30", 0, "SCHOOL").subscribe(response: any) => {
      console.log(response);
    };
  }
}
