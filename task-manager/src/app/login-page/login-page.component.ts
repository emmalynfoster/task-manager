import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public static Route: Route = {path: '', component: LoginPageComponent};

  constructor(private router: Router) { }

  navigateToMyTasks(): void {
    this.router.navigate(['mytasks']);
  }
}
