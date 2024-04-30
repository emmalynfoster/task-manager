import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ReminderService } from '../services/reminder.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  public reminder_editor_form = this.formBuilder.group({
    note: this.note
  })

  constructor(protected formBuilder: FormBuilder, 
              protected reminderService: ReminderService,
              private router: Router,
              private snackBar: MatSnackBar
              ){
  }

  onSubmit(){
    if(this.reminder_editor_form.valid) {
      this.reminderService.createNote(this.reminder_editor_form.value.note!)
      .subscribe({
        next: () => (this.onSuccess()),
        error: (err) => (this.onError(err))
      });
    } else {
      this.snackBar.open("Please enter the values in the form correctly", '', { duration: 2000 })
    }
  }

  onSuccess() {
    this.router.navigate(['tasks']);
    this.snackBar.open("Reminder Created!", '', { duration: 2000 })
  }

  onError(error: any) {
    this.snackBar.open('Error: Task Not Edited', '', { duration: 2000 });
  }

}
