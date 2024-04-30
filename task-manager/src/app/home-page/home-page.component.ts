import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TaskCardWidget } from '../task-card/task-card.widget';
import { SharedModule } from '../shared.module';
import { RemindersWidget } from '../reminders/reminders.widget';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TaskCardWidget, SharedModule, RemindersWidget],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  public static Route: Route = {path: 'tasks', component: HomePageComponent};
  public category1: number[];
  public category2: number[];
  public category3: number[];
  public suggestion: string;


  constructor(private router: Router){
    this.category1 = [1,2,3,4,5,6];
    this.category2 = [1,2,3];
    this.category3 = [1,2,3];
    this.suggestion = '';
  }

  navigateToNewTask(){
    this.router.navigate(['edit']);
  }
  

  async getActivity() {
    try {
        const response = await fetch("https://www.boredapi.com/api/activity");
        //const response = await fetch("https://www.boredapi.com/api/activity?type=recreational");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.activity);
        return data.activity;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
  }


  handleClick(){
    this.getActivity().then(data => {
      this.suggestion = data + '.';
    }).catch(error => {
      this.suggestion = "Sorry, a suggestion could not be retrieved. Try again later.";
      console.error("Error fetching text data:", error);
    });
}

}


