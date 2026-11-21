import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';

import { environment } from '../../../environments/environment.development';

import { Observable, catchError, finalize, map, of, shareReplay, tap } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { UserResponseDTO } from '../../model/UserResponseDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly userApiUrl = `${environment.apiUrl}/users`;
  private readonly http = inject(HttpClient);

  private readonly tokenKey = 'conecta-token';

  private readonly currentUserSignal = signal<UserResponseDTO | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();

  private validationRequest$?: Observable<boolean>;

  public register(body: RegisterRequest) {
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  public login(body: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, body);
  }

  public setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    this.currentUserSignal.set(null);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  public getCurrentUser(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.userApiUrl}/me`);
  }

  public validateSession(): Observable<boolean> {
    if (!this.getToken()) {
      this.currentUserSignal.set(null);
      return of(false);
    }

    if (this.currentUserSignal()) {
      return of(true);
    }

    if (this.validationRequest$) {
      return this.validationRequest$;
    }

    this.validationRequest$ = this.getCurrentUser().pipe(
      tap((user) => this.currentUserSignal.set(user)),
      map(() => true),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.logout();
        }

        return of(false);
      }),
      finalize(() => {
        this.validationRequest$ = undefined;
      }),
      shareReplay(1),
    );

    return this.validationRequest$;
  }

  public logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.currentUserSignal.set(null);
  }
}
