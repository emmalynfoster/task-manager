import { Component } from '@angular/core';
import { Route } from '@angular/router';


@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
public static Route: Route = {
  path:'edit',
  component: EditTaskComponent,
  title: 'Task Editor'
};

}
