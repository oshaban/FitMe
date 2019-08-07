import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeightFormData } from '../interfaces/weightForm';
import { WeightsGetData } from '../interfaces/weightsRes';

/**
 * @title Weight Data Service
 * Used to interact with /api/weights/me
 */

/**
 * Sets authorization token for endpoint
 */
const httpOptions = {
  headers: new HttpHeaders({
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRhMGQ2NWM3N2I1MjQxZjRlNTEzMTMiLCJpYXQiOjE1NjUxMzQxODF9.JvZsGOHbRlULB7Fd3Whe6hZwvrf_Kwfny23ZMKUSTn8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WeightsDataService {

  /**
   * Endpoint for weights
   */
  private weighturi = 'http://localhost:3500/api/weights/me';

  /**
   * @param http Injected HTTP client used to send requests to back-end
   */
  constructor(private http: HttpClient) { }

  /** POST: saves a new weight in the database
   * Returns an observable. After subscribing response data is type WeightsResData.
   * @param weight Weight to add to database
   */
  addWeight(weight: WeightFormData): Observable<any> {
    return this.http.post<WeightsGetData>(this.weighturi, weight, httpOptions);
  }

  /** GET: gets all weights for current user from the database
   * Returns an observable. After subscribing response data is type WeightsResData.
   */
  getWeights(): Observable<any> {
    return this.http.get<WeightsGetData>(this.weighturi, httpOptions);
  }

}
