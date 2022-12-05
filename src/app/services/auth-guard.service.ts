import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import { InterceptorsService } from './interceptors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
 

  constructor(
    private router: Router,
   private authenticationService: AuthService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authenticationService.userValue;
    console.log('user')
    if (user) {
        // logged in so return true
        console.log(user,'userrrrr')
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    console.log('non va')
    return false;
}
}
