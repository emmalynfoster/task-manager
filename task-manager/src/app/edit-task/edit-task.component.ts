import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared.module';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    SharedModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {

  public static Route: Route = {
    path:'edit',
    component: EditTaskComponent,
    title: 'Task Editor'
  };

  task_name = new FormControl('', [Validators.required]);
  due_date = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  //change to set to task property categories
  categories = ["HOME", "WORK","SCHOOL"];

  public task_editor_form = this.formBuilder.group({
    task_name: this.task_name,
    due_date: this.due_date,
    description: this.description,
    category: this.category
  });

  constructor(
    protected formBuilder: FormBuilder,
    private taskService: TaskService
  ){
    this.task_editor_form.setValue({
      task_name: "Task 1",
      due_date: "4/30/24",
      description: "Task",
      category: "School"
   });
  }

  //function should be added as an event handler to the button that will 
  updateTask() {
    //Needs implementation ** Similar to createNewTask() in home-page.components.ts
  }

  onSubmit(){}

}
