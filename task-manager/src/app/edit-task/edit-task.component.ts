import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInput, MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared.module';
import { TaskService } from '../services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    path:'edit/:id',
    component: EditTaskComponent,
    title: 'Task Editor'
  };

  task_name = new FormControl('', [Validators.required]);
  due_date = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  //change to set to task property categories
  protected categories = ["HOME", "WORK","SCHOOL"];

  id: number = -1;

  isNew: boolean = false;

  public task_editor_form = this.formBuilder.group({
    task_name: this.task_name,
    due_date: this.due_date,
    description: this.description,
    category: this.category
  });
  constructor(
    protected formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.isNew = route.snapshot.params['id'] == 'new';

    if(!this.isNew){
      this.id = route.snapshot.params[':id'];
      this.taskService.getTaskById(this.id).subscribe({
        next: (taskData) => {
          this.task_editor_form.setValue({
            task_name: taskData.title,
            due_date: taskData.due_date,
            description: taskData.description,
            category: taskData.category
          });
        }
      });
    }
  }

  onSubmit(){
    if(this.task_editor_form.valid){
      if(this.isNew){
        console.log(this.task_editor_form.value.task_name);
        this.taskService
        .createTask(
          this.task_editor_form.value.task_name!, 
          this.task_editor_form.value.due_date!, 
          this.task_editor_form.value.description!,
          0, 
          this.task_editor_form.value.category!
        )
        .subscribe({
          next: () => (this.onSuccess()),
          error: (err) => (this.onError(err))
        });
      } else {
        this.taskService
          .updateTask(
            this.id,
            this.task_editor_form.value.task_name!,
            this.task_editor_form.value.description!,
            this.task_editor_form.value.due_date!,
            0,
            this.task_editor_form.value.category!
          )
          .subscribe({
            next: () => (this.onSuccess()),
            error: (err) => (this.onError(err))
          });
      }
    } else {
      this.snackBar.open("Please enter the values in the form correctly", '', { duration: 2000 })
    }
  }

  onSuccess(){
    this.router.navigate(['tasks']);
    this.snackBar.open("Task Created!", '', { duration: 2000 })
  }
  onError(error: any){
    if (this.isNew) {
      console.log(error);
      this.snackBar.open('Error: Task Not Created', '', { duration: 2000 });
    } else {
      this.snackBar.open('Error: Task Not Edited', '', { duration: 2000 });
    }
  }
}
