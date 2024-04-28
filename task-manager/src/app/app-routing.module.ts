import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RemindersWidget } from './reminders/reminders.widget';

export const routes: Routes = [
  HomePageComponent.Route,
  EditTaskComponent.Route,
  RemindersWidget.Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
