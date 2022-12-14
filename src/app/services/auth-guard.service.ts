import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';


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
   
    if (user) {
        // se esiste l utente user 
        console.log(user,'user')
        return true
     //   return true;
    } else{
      this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    // utente non trovato non effettua l accesso 

    
  
}
}
