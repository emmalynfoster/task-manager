import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule,  MatFormField, MatCard, MatInput, MatLabel, MatButton],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
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

  public task_editor_form = this.formBuilder.group({
    task_name: this.task_name,
    due_date: this.due_date,
    description: this.description,
    category: this.category
  });

  constructor(
    protected formBuilder: FormBuilder
  ){
  //  this.task_editor_form.setValue({
   // });
  }

  onSubmit(){}

}
