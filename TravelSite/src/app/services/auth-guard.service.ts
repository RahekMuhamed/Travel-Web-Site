import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = next.data['roles'] as string[];

    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      if (userRole && requiredRoles.includes(userRole)) {
                return true;
      } else {
        this.router.navigate(['/unauthorized']);
                return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
