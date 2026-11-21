import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('conecta-token');

  if (token) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
