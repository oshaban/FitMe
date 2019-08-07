import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserFormData } from '../interfaces/userForm';
import { UserGetData } from '../interfaces/userRes';
import { UserPostResData } from '../interfaces/userPostRes';
import { UserFormLogin } from '../interfaces/loginForm';


/** What the register form expects  */
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}
/** Token recieved from /api/auth  */
export interface Token {
  token: string;
}

/** What the login endpoint expects  */
export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /** Endpoint for creating users */
  private userCreateuri = 'http://localhost:3500/api/users';

  /** Endpoint to get logged-in user data  */
  private userMeuri = 'http://localhost:3500/api/users/me';

  /** Endpoint to login/auth user  */
  private userLoginuri = 'http://localhost:3500/api/auth';

  /** Stores a users jwt token  */
  private token: string;

  /** Sets jwt token in HTTP headers request  */
  private httpOptions = {
    headers: new HttpHeaders({
      'x-auth-token': `${this.getToken()}`
    })
  };

  /** Saves a users jwt  */
  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  /** Gets a users jwt  */
  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  /** Logs out a user by removing jwt  */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  /** POST: logs in a user
   * Returns an observable. After subscribing response data is type UserResData.
   * Observe full response and get x-auth-token header; this is exposed on back-end.
   * Body is a string of the x-auth-token
   */
  logInUser(userLoginData: UserFormLogin): Observable<any> {

    return this.http.post<Token>(this.userLoginuri, userLoginData, {observe: 'response'}).pipe(
        tap( resData => {

          // If login is successful, a token is returned
          if (resData.body.token) {
            this.saveToken(resData.body.token);
          }

        } )
      );

  } // End addUser

  /** POST: saves a new user in the database
   * Returns an observable. After subscribing response data is type UserResData.
   * Observe full response and get x-auth-token header; this is exposed on back-end.
   */
  addUser(userData: UserFormData): Observable<any> {

    return this.http.post<UserPostResData>(this.userCreateuri, userData, {observe: 'response'}).pipe(
        tap( resData => {
          if ( resData.resData.headers.get('x-auth-token') ) {
            this.saveToken( resData.headers.get('x-auth-token') );
          }
          // console.log( resData.headers.get('x-auth-token') );
        } )
      );

  } // End addUser


  /** GET: gets current user from database
   * Returns an observable. After subscribing response data is type UserGetData.
   */
  getUser(): Observable<any> {
    return this.http.get<UserGetData>(this.userMeuri, this.httpOptions);
  }

}
