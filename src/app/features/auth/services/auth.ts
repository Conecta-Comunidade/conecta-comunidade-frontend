import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly http = inject(HttpClient);

  public register(body: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  public login(body: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, body);
  }
}
