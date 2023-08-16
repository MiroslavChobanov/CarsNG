import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  user = new User();

  constructor(private authService: AuthService, private router: Router){}
  

  login(user: User) {
    this.authService.login(user).subscribe((token: string) => {
      localStorage.setItem('authToken', token);
      this.authService.setLoggedInStatus(true);
      this.router.navigate(['/']); // Redirect to the homepage
    });
  }

}
