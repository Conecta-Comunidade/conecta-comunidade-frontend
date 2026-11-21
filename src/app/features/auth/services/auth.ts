import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, shareReplay, tap } from 'rxjs';

import { environment } from '../../../environments/environment.development';

import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { UserResponseDTO } from '../../model/UserResponseDTO';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);

  private readonly apiUrl = environment.apiUrl;

  private readonly currentUserSignal = signal<UserResponseDTO | null>(null);

  readonly currentUser = this.currentUserSignal.asReadonly();

  private validationRequest$?: Observable<boolean>;

  register(body: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register`, body);
  }

  login(body: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, body);
  }

  getCurrentUser(): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/users/me`);
  }

  validateSession(): Observable<boolean> {
    if (!this.tokenStorage.getToken()) {
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

  logout(): void {
    this.tokenStorage.removeToken();
    this.currentUserSignal.set(null);
  }
}
