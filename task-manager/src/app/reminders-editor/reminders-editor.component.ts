import { Component } from '@angular/core';
import { Route } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reminders-editor',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reminders-editor.component.html',
  styleUrl: './reminders-editor.component.css'
})
export class RemindersEditorComponent {
  public static Route: Route = {path: 'reminders/editor', component: RemindersEditorComponent};

  note = new FormControl('', [Validators.required]);

  public new_reminder = this.formBuilder.group({
    note: this.note
  });

  constructor(protected formBuilder: FormBuilder){
  }

  onSubmit(){}

}
