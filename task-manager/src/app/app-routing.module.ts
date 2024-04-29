import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RemindersEditorComponent } from './reminders-editor/reminders-editor.component';

export const routes: Routes = [
  HomePageComponent.Route,
  EditTaskComponent.Route,
  RemindersEditorComponent.Route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
