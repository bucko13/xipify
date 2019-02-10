// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return (!!this.getToken());
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
