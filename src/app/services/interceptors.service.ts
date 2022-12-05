import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


// fake back end
const users = [{ id: 1, username: 'Fiduciario', password: 'test', role:2 },
{ id: 1, username: 'fiduciario', password: '123456',  role:1 }];


@Injectable({
  providedIn: 'root'
})

export class InterceptorsService implements HttpInterceptor {
  userValue: any;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize());

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            case url.endsWith('/users') && method === 'GET':
                return getUsers();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
    }

    // route functions

    function authenticate() {
        const { username, password } = body;
        const user = users.find(x => x.username === username && x.password === password);
        console.log(user,'aaaaa')
        if (!user) return error('Username or password is incorrect');
        return ok({
            id: user.id,
            username: user.username,
            token: 'fake-jwt-token',
            role:user.role
            
        })
    }

    function getUsers() {
        if (!isLoggedIn()) return unauthorized();
        return ok(users);
    }

    // helper functions

    function ok(body?: any) {
        return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
        return throwError(() => ({ error: { message } }));
    }

    function unauthorized() {
        return throwError(() => ({ status: 401, error: { message: 'Unauthorised' } }));
    }

    function isLoggedIn() {
        return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }
}
}

export let fakeBackendProvider = {
// use fake backend in place of Http service for backend-less development
provide: HTTP_INTERCEPTORS,
useClass: InterceptorsService,
multi: true
};
