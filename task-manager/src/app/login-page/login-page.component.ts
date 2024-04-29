import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, Form } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public static Route: Route = {path: '', component: LoginPageComponent};
  login_username = new FormControl('', [Validators.required]);
  login_password = new FormControl('', [Validators.required]);
  signup_username = new FormControl('', [Validators.required]);
  signup_password = new FormControl('', [Validators.required]);

  public login_form=this.formBuilder.group({
    login_username: this.login_username,
    login_password: this.login_password
  })

  public signup_form=this.formBuilder.group({
    signup_username: this.signup_username,
    signup_password: this.signup_password
  })

  constructor(private router: Router, protected formBuilder: FormBuilder) { }

  navigateToMyTasks(): void {
    this.router.navigate(['tasks']);
  }
}
