import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  user = new User();
  userForm: FormGroup;
  showSuccessMessage: boolean = false;
  

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder)
  {this.userForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });}
  
  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.user!,
        ...this.userForm.value
      };
        this.register(updatedUser);
        this.showSuccessMessage = true;
        this.userForm.reset();
    }
    else{
      this.showSuccessMessage = false;
    }
  }

  register(user: User) {
    this.authService.register(user).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/login']); // Redirect to the homepage
    });
  }
  

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
    });
  }
}