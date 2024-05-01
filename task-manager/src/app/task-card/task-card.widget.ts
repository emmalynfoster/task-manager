import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'task-card-widget',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './task-card.widget.html',
  styleUrl: './task-card.widget.css'
})
export class TaskCardWidget {
  @Input() task!: any;
  constructor(private router: Router) { }

  navigateToEdit(): void {
    this.router.navigate(['edit/:id']);
  }

  // for display on each widget using frontend services
  getTaskTitle(){}

  getTaskCategory(){}

  getTaskDescription(){}

  getDueDate(){}

  getIsComplete(){}

  // update object to complete, if checked vs. not checked
  onCheck(){}

}
