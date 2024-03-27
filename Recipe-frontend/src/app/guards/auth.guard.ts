import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  const auth: AuthService = inject(AuthService);
  console.log(auth.getLoginStatus());
  return auth.getLoginStatus();
};