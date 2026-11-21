import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';
import { map } from 'rxjs';
import { TokenStorageService } from '../../features/auth/services/token-storage.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  if (!tokenStorage.getToken()) {
    return true;
  }

  return authService
    .validateSession()
    .pipe(map((isAuthenticated) => !isAuthenticated || router.createUrlTree(['/home'])));
};
