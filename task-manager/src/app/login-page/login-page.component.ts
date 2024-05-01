import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormControl, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { DarkModeService } from '../app-dark-mode-service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  public static Route: Route = {
    path: '', 
    component: LoginPageComponent};
  
  
    login_username = new FormControl('', [Validators.required]);
    dark_mode = new FormControl();
    user!: any;

  
  public login_form=this.formBuilder.group({
    login_username: this.login_username,
    dark_mode: this.dark_mode
  })



  constructor(
    private router: Router, 
    protected formBuilder: FormBuilder, 
    private darkModeService: DarkModeService,
    private userService: UserService) 
  {}
    
  navigateToMyTasks(): void {
    this.router.navigate(['tasks']);
  }
  
  onSubmit(){  
    if(this.login_form.valid){
    this.userService.getUserByName(this.login_form.value.login_username!).subscribe({
      next: (user) => {
        this.user = user
        this.darkModeService.setDarkMode(Boolean(this.user.dark_mode))
        this.navigateToMyTasks()
      },
      error: (err) => {
        this.onNewUser()
      }
    })
    
    }
  }
  onNewUser() {
    this.userService.createNewUser(this.login_form.value.login_username!, Number(this.darkModeService.isDarkMode)).subscribe({
      next: () => (this.navigateToMyTasks())
    })
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
