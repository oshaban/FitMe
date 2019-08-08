import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightFormData } from '../interfaces/weightForm';
import { WeightsGetData } from '../interfaces/weightsRes';
import { AuthenticationService } from './authentication.service';

/**
 * @title Weight Data Service
 * Used to interact with /api/weights/me
 */

@Injectable({
  providedIn: 'root'
})
export class WeightsDataService {

  /** Endpoint for weights */
  private weighturi = 'http://localhost:3500/api/weights/me';

  /**
   * @param http Injected HTTP client used to send requests to back-end
   * @param auth Gets user jwt token
   */
  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    ) { }

  /** POST: saves a new weight in the database
   * Returns an observable. After subscribing response data is type WeightsResData.
   * @param weight Weight to add to database
   */
  addWeight(weight: WeightFormData): Observable<any> {
    // Set httpOptions before get response
    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': `${this.auth.getToken()}`
      })
    };

    return this.http.post<WeightsGetData>(this.weighturi, weight, httpOptions);
  }

  /** GET: gets all weights for current user from the database
   * Returns an observable. After subscribing response data is type WeightsResData.
   */
  getWeights(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'x-auth-token': `${this.auth.getToken()}`
      })
    };

    return this.http.get<WeightsGetData>(this.weighturi, httpOptions);
  }

}

// Sample POST request format
/* {
	"weight":"150",
	"date":"2000-08-05T12:54:48.944Z"
	}
} */
