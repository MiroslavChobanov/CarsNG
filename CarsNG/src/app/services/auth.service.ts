import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7113/api/Auth/register',
      user
    );
  }

  public login(user: User): Observable<string> {
    return this.http.post('https://localhost:7113/api/Auth/login', user, {
      responseType: 'text',
    });
  }

  public getMe(): Observable<string> {
    return this.http.get('https://localhost:7113/api/Auth', {
      responseType: 'text',
    });
  }

  setLoggedInStatus(status: boolean) {
    this.isLoggedIn = status;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.setLoggedInStatus(false);
  }
}