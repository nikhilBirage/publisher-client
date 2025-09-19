import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // In a real app, you would validate against a backend
    if (username === 'admin' && password === 'password') {
      sessionStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('isAuthenticated');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }
}
