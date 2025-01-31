import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    switchMap(user => {
      if (!user) {
        return of(router.createUrlTree(['/']));
      }

      const allowedRoles = route.data['allowedRoles'] as string[];

      if (!allowedRoles || allowedRoles.includes(user.role)) {
        return of(true);
      }

      return authService.checkAdminStatus().pipe(
        map(isAdmin => {
          if (isAdmin && allowedRoles.includes('admin')) {
            return true;
          }
          return router.createUrlTree(['/']);
        })
      );
    })
  );
};

