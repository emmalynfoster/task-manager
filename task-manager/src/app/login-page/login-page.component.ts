import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { DarkModeService } from '../app-dark-mode-service';

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
  dark_mode = new FormControl();


  public login_form=this.formBuilder.group({
    login_username: this.login_username,
    dark_mode: this.dark_mode
  })


  constructor(
    private router: Router, 
    protected formBuilder: FormBuilder, 
    private darkModeService: DarkModeService) 
  {}

  navigateToMyTasks(): void {
    this.router.navigate(['tasks']);
  }

  toggleDarkMode(): void {
    console.log('Toggling dark mode...');
    console.log('Dark mode value:', this.dark_mode.value);
    if (this.dark_mode.value) {
      this.darkModeService.toggleDarkMode();
    } else {
      this.darkModeService.toggleDarkMode();
    }
  }
}
