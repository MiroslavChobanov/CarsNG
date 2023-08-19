import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private apiUrl = 'https://localhost:7113/api';
  private currentUser: User | null = null;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post<any>(
      'https://localhost:7113/api/Auth/register',
      user
    );
  }

  login(user: User): Observable<string> {
    return this.http.post('https://localhost:7113/api/Auth/login', user, {
      responseType: 'text',
    }).pipe(
      tap((token: string) => {
        localStorage.setItem('authToken', token);
        this.currentUserSubject.next(user); 
      })
    );
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

  getCurrentUserName(): string | null {
    if (this.currentUserSubject.value) {
      return this.currentUserSubject.value.username;
    }
    return null; 
  }
}
