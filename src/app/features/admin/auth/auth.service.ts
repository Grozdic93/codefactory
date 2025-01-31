import { Injectable } from '@angular/core';
import {
  from,
  Observable,
  BehaviorSubject,
  switchMap,
  of,
  throwError,
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private serverUrl = environment.backendUrl;
  private tokenExpirationTimer: any;

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router
  ) {
    this.autoLogin();
  }
  getAllUsers(): Observable<User[]> {
    return this.user.pipe(
      take(1),
      switchMap((currentUser) => {
        if (!currentUser || !currentUser.token) {
          return throwError(() => new Error('No authenticated user'));
        }
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${currentUser.token}`
        );
        return this.http
          .get<User[]>(`${this.serverUrl}/users`, { headers })
          .pipe(
            map((users) =>
              users.map(
                (user) =>
                  new User(
                    user.uid,
                    user.email,
                    user.displayName,
                    '',
                    new Date(),
                    user.role,
                    user.admin
                  )
              )
            )
          );
      })
    );
  }

  deleteUser(uid: string): Observable<void> {
    return this.user.pipe(
      take(1),
      switchMap((currentUser) => {
        if (!currentUser || !currentUser.token) {
          return throwError(() => new Error('No authenticated user'));
        }
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${currentUser.token}`
        );
        return this.http.delete<void>(`${this.serverUrl}/users/${uid}`, {
          headers,
        });
      })
    );
  }

  loginWithEmailAndPassword(email: string, password: string): Observable<User> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => from(userCredential.user!.getIdToken())),
      switchMap((token) => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        return this.http
          .get<{ uid: string; email: string; isAdmin: boolean; role: string }>(
            `${this.serverUrl}/checkAdminStatus`,
            { headers }
          )
          .pipe(
            map((response) => {
              const user = new User(
                response.uid,
                response.email,
                null,
                token,
                new Date(new Date().getTime() + 3600 * 1000),
                response.role
              );
              this.user.next(user);
              localStorage.setItem('userData', JSON.stringify(user));
              return user;
            })
          );
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  registerWithEmailAndPassword(
    email: string,
    password: string
  ): Observable<any> {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap((userCredential) =>
        from(userCredential.user?.getIdToken() as Promise<string>)
      ),
      catchError((error) => {
        console.error('Error creating new user:', error);
        return throwError(() => new Error('Error creating new user'));
      })
    );
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      this.user.next(null);
      this.router.navigate(['/']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    });
  }

  autoLogin(): void {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      return;
    }

    const userData: {
      uid: string;
      email: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: string;
      role: string;
      admin: boolean;
    } = JSON.parse(userDataString);

    const loadedUser = new User(
      userData.uid,
      userData.email,
      userData.displayName,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.role,
      userData.admin
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  getCurrentUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  private handleAuthentication(firebaseUser: any): Observable<User> {
    return from(firebaseUser.getIdToken() as Promise<string>).pipe(
      switchMap((token: string) => {
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );
        return this.http
          .get<{ isAdmin: boolean }>(`${this.serverUrl}/checkAdminStatus`, {
            headers,
          })
          .pipe(
            map((response) => {
              const expirationDate = new Date(
                new Date().getTime() + 3600 * 1000
              );
              const user = new User(
                firebaseUser.uid,
                firebaseUser.email,
                firebaseUser.displayName,
                token,
                expirationDate,
                response.isAdmin ? 'admin' : 'user',
                response.isAdmin
              );
              this.user.next(user);
              localStorage.setItem('userData', JSON.stringify(user));
              return user;
            }),
            catchError((error) => {
              console.error('Error checking admin status:', error);
              return throwError(
                () => new Error('Failed to check admin status')
              );
            })
          );
      }),
      catchError((error) => {
        console.error('Error getting ID token:', error);
        return throwError(() => new Error('Failed to get ID token'));
      })
    );
  }

  checkSessionValidity() {
    const userDataString = localStorage.getItem('userData');
    if (!userDataString) {
      this.logout();
      return;
    }

    const userData: {
      uid: string;
      email: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: string;
      role: string;
      admin: boolean;
    } = JSON.parse(userDataString);
    if (new Date(userData._tokenExpirationDate) <= new Date()) {
      this.logout();
    }
  }
  setUserAsAdmin(emailToPromote: string): Observable<any> {
    return this.user.pipe(
      take(1),
      switchMap((currentUser) => {
        if (!currentUser || !currentUser.token) {
          return throwError(() => new Error('No authenticated user'));
        }
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${currentUser.token}`
        );
        return this.http.post(
          `${this.serverUrl}/setAdminClaim`,
          { emailToPromote },
          { headers }
        );
      })
    );
  }

  checkAdminStatus(): Observable<boolean> {
    return this.user.pipe(
      take(1),
      switchMap((user) => {
        if (!user || !user.token) {
          return of(false);
        }
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${user.token}`
        );
        return this.http
          .get<{ isAdmin: boolean }>(`${this.serverUrl}/checkAdminStatus`, {
            headers,
          })
          .pipe(
            map((response) => {
              if (response.isAdmin) {
                user.role = 'admin';
                this.user.next(user);
                localStorage.setItem('userData', JSON.stringify(user));
              }
              return response.isAdmin;
            }),
            catchError((error) => {
              console.error('Error checking admin status:', error);
              return of(false);
            })
          );
      })
    );
  }
}
