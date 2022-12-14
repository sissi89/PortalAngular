import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth-service.service';




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // try catch
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status)) {
                // disconnessione automatica in caso di errore 400 ecc
                this.authenticationService.logout();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}