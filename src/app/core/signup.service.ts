import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserFormData } from './userFormData';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Signup service
 * This will send a request to the backend with the user data to sign them up
 */

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private usersURL = 'https://ng-complete-guide-f8c0d.firebaseio.com/users.json'; // URL to users API

  constructor(
    private http: HttpClient,
  ) { }

  /* POST: add a user to the server */
  createUser(user: UserFormData): Observable<any> {
    return this.http.post<UserFormData>(this.usersURL, user);
  }

  /* GET: fetches users from the server */
  getUsers(): Observable<any> {
    return this.http.get(this.usersURL);
  }

}
