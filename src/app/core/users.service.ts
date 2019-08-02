import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Fetches data and interacts with external APIs

/**
 * Service used to interact with endpoint /api/users
 */

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(
    private http: HttpClient // Injects HTTPClient instance
  ) { }

} // End class UsersService
