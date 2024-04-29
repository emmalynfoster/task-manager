import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-reminders-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reminders-editor.component.html',
  styleUrl: './reminders-editor.component.css'
})
export class RemindersEditorComponent {
  public static Route: Route = {path: 'reminders/editor', component: RemindersEditorComponent};


}
