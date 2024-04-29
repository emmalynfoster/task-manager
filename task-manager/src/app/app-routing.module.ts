import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskPageComponent } from './task-page/task-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
// import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  LoginPageComponent.Route,
  TaskPageComponent.Route,
  EditTaskComponent.Route,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
