import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardWidget } from './task-card.widget';

describe('TaskCardComponent', () => {
  let component: TaskCardWidget;
  let fixture: ComponentFixture<TaskCardWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardWidget]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
