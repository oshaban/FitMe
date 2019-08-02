import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserFormData } from '../pages/signup/userFormData';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * @title Signup service
 * This will send a request to the backend with the user data to sign them up
 */

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  // private usersURL = 'https://ng-complete-guide-f8c0d.firebaseio.com/users.json'; // URL to users API

  private usersURL = 'https://ng-complete-guide-f8c0sfdghsdfghd.firebaseio.com/users.json';

  // For error handling: https://angular.io/guide/http#error-handling
  // https://grokonez.com/frontend/angular/angular-6/error-handler-angular-6-httpclient-catcherror-retry-with-node-js-express-example
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  constructor(
    private http: HttpClient,
  ) { }

  /* POST: add a user to the server */
  createUser(user: UserFormData): Observable<any> {
    return this.http.post<UserFormData>(this.usersURL, user)
      .pipe(
        retry(2), // Retrys a failed request 2 timse
        catchError(this.handleError) // Handles error
      );
  }

  /* GET: fetches users from the server */
  getUsers(): Observable<any> {
    return this.http.get(this.usersURL);
  }

}
