
/*
  Service used to interact with endpoint /api/users
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Fetches data and interacts with external APIs

// Define the shape of the data, so Angular knows how to deal with it
export interface Users {
  heroesUrl: string;
  textfile: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private http: HttpClient // Injects HTTPClient instance
  ) { }

  

}
