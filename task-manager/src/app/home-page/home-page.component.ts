import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
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
  
  workTasks!: any[];
  homeTasks!: any[];
  schoolTasks!: any[];

  ngOnInit(){
    this.taskService.getAllWork().subscribe({
      next: (tasks) => (this.workTasks = tasks)
    });

    this.taskService.getAllHome().subscribe({
      next: (tasks) => (this.homeTasks = tasks)
    }); 
    
    this.taskService.getAllSchool().subscribe({
      next: (tasks) => (this.schoolTasks = tasks)
    });  
    
  }

  constructor(private router: Router, private taskService: TaskService){
   
  }

  navigateToNewTask(){
    this.router.navigate(['edit/new']);
  }

}
