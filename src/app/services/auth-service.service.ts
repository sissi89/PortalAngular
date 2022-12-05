import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/auth';
import { environment } from 'src/environments/environment';

const { api, auth } = environment;

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        // inizializzo nel costruttore un osservable e mi prendo l utente
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${auth}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // memorizza i dettagli dell'utente e il token jwt nella memoria locale per mantenere l'utente connesso tra gli aggiornamenti della pagina
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remuove user e va alla login
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/Login']);
    }
}