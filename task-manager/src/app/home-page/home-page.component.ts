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

  //This method will be used as an evet handler for a New task button ** May need to create a new page for creating a new task and then move this in there
  createNewTask() {
    this.taskService.createTask("Comp 426", "finish final project", "2024-04-30", 0, "SCHOOL").subscribe((response: any) => {
      //Make sure the response is correct on console, then check and make sure it is working in postman
      //* Curently this is not working
      console.log(response);
    });
  }

}
