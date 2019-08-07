import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserFormData } from '../interfaces/userForm';
import { UserGetData } from '../interfaces/userRes';
import { UserPostResData } from '../interfaces/userPostRes';
import { UserFormLogin } from '../interfaces/loginForm';


/** Payload from jwt
 * _id: user id for corresponding jwt
 * iat: time jwt was issued at in ms
 */
export interface UserDetails {
  _id: string;
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

  /** XSaves a users jwt  */
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  /** XGets a users jwt from local storage */
  private getToken(): string {
    try {
      const storedToken: string = localStorage.getItem('token');
      if (!storedToken) {throw new Error('no token found'); }
      return storedToken;
    } catch(err) {
      console.log(err);
    }

  }

  /** XLogs out a user by removing jwt  */
  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  /** Gets details of user jwt payload  */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1]; // Gets payload from jwt
      payload = window.atob(payload); // Decodes payload
      return JSON.parse(payload); // Returns payload
    } else {
      return null;
    }
  }

  /** Checks if a user is loggedin based on jwt  */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    console.log(user);

    // TO DO ; make jwt expire
    if ( user ) {
      return true;
    } else {
      return false;
    }
  }

  /** XPOST: logs in a user by POST to /api/auth
   * Returns an observable of type Token.
   * Observe full response and get token from body: {token: ...}
   */
  logInUser(userLoginData: UserFormLogin): Observable<Token> {

    // Clear out local storage
    localStorage.removeItem('token');

    return this.http.post<Token>(this.userLoginuri, userLoginData).pipe(
      tap( resData => {
        console.log('Token in auth logInUser: ' + resData.token);
        // If login is successful, a token is returned
        if (resData.token) {
          console.log('Success token: ' + resData.token);
          this.saveToken(resData.token);

          console.log('Getting token: ' + this.getToken());
        }

      })
    );

  } // End logInUser

  /** XPOST: saves a new user in the database
   * Returns an observable. After subscribing response data is type UserResData.
   * Observe full response and get x-auth-token header; this is exposed on back-end.
   */
  createUser(userData: UserFormData): Observable<any> {

    // Clear out local storage
    localStorage.removeItem('token');

    return this.http.post<UserPostResData>(this.userCreateuri, userData, {observe: 'response'}).pipe(
        tap( resData => {
          // If valid POST response, get the x-auth-token and save it

            const resHeaders = resData.headers.get('x-auth-token');
            console.log(typeof(resHeaders));
            console.log('Token from res headers: ' + resHeaders);
            this.saveToken( resHeaders );
            console.log('Getting token from storage after saved   ' + this.getToken() );
        })
      );

  } // End addUser


  /** GET: gets current user from database
   * Returns an observable. After subscribing response data is type UserGetData.
   */
  getUser(): Observable<UserGetData> {

    // Set httpOptions before get response
    let httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': `${this.getToken()}`
      })
    };

    return this.http.get<UserGetData>(this.userMeuri, httpOptions);

  }

}
