import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  /**
   * Method which is activated before each route change to a route which requires this
       guard.
  * E.g. [{ path: 'secure', component: SecureComponent, canActivate: [AuthGuard]}, ...]
  *
  **/
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { 
    return this.authService.authenticated
      // pipe each value that is emitted by the observable
      .pipe(
      // tap will intercept each emission of a value and perform some action tap(authenticated => {
      tap(authenticated => {  
        if (!authenticated) {
          this.router.navigate(['/']); // Navigate to home page after logout
        }
      }));
    }

}
    
    
