import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserFormData } from '../interfaces/userForm';
import { UserGetData } from '../interfaces/userRes';


/**
 * @title User Data Service
 * Used to interact with /api/users/me
 */

/**
 * Sets authorization token for endpoint
 */
const httpOptions = {
  headers: new HttpHeaders({
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDRhYjFmMzcwYjVjMDI3MmMzYzIyYTAiLCJpYXQiOjE1NjUxNzYzMDd9.BrV4cHKbLOB3EkiO-ptMFODS81EMV8lksVAB3o4oKos'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

  /** Endpoint for users */
  private useruri = 'http://localhost:3500/api/users/me';

  /**
   * @param http Injected HTTP client used to send requests to back-end
   */
  constructor(private http: HttpClient) { }

  /** POST: saves a new user in the database
   * Returns an observable. After subscribing response data is type UserResData.
   */
  addUser(user: UserFormData): Observable<any> {
    return this.http.post<UserGetData>(this.useruri, user, httpOptions);
  }

  // TO DO fix UserGetData above

  /** GET: gets current user from database
   * Returns an observable. After subscribing response data is type UserGetData.
   */
  getUser(): Observable<any> {
    return this.http.get<UserGetData>(this.useruri, httpOptions);
  }

  /**
   * Test document for user data
   */
  private userData =  {
    username: 'string',
    firstname: 'string',
    lastname: 'string',
    password: 'string',
    fitnessProfile: {
        startWeight: { weight: 120, date: new Date(2019, 1, 1) },
        goal: {goalType: 'Gain', perWeek: 0.5},
        gender: 'F',
        height: 72,
        birthDay: new Date(2019, 1, 1),
        activityMultiplier: 1,
        macros: {protein: 200, fat: 60, carbs: 400},
    }
  };

  /**
   * Format of data that is fetched from DB
   */
  private userWeightData =  {
    _id: 899,
    weight: [
      { value: 150, name: new Date(2019, 8, 1).toISOString() },
      { value: 160, name: new Date(2019, 8, 2).toISOString() },
      { value: 170, name: new Date(2019, 8, 3).toISOString() },
      { value: 160, name: new Date(2019, 8, 5).toISOString() },
      { value: 160, name: new Date(2019, 8, 6).toISOString() },
      { value: 160, name: new Date(2019, 8, 8).toISOString() },
      { value: 160, name: new Date(2019, 8, 9).toISOString() },
      { value: 160, name: new Date(2019, 8, 10).toISOString() },
      { value: 160, name: new Date(2019, 8, 11).toISOString() },
      { value: 160, name: new Date(2019, 8, 12).toISOString() },
    ]
  };

  /**
   * Stores a users latest Weight
   * Used in getCurrentWeight()
   */
  private latestWeight: {value: number, name: string};

  /**
   * Stores a users TDEE
   */
  private BMR: number;

  /**
   * Stores a users weight in KG
   */
  private wtinkg: number;

  /**
   * Stores a users height in CM
   */
  private htincm: number;

  /**
   * Stores a users age in years
   */
  private ageInYrs: number;

  /**
   * Stores if a date was found in the server
   */
  private found: boolean;

  // Public data


  /**
   * Returns an object with {date:.., value:..} form
   */
  public getCurrentWeight() {

    // latestWeight is an object with {name:.., value:..} form
    this.latestWeight = this.userWeightData.weight.reduce( function(r, a) {
      return r.name > a.name ? r : a;
    });

    return this.latestWeight;

  }

  /**
   * Returns a users goal in format {goalType: number, perWeek: number}
   */
  public getUserGoal() {
    return this.userData.fitnessProfile.goal;
  }

  /**
   * Returns a users weights in {value:.., name:..} format
   */
  public getUserWeights() {
    return this.userWeightData.weight;
  }

  /**
   * Returns all the weights of a user in a multi-set format for graphing
   */
  public getWeightsMulti() {

    return  [
      {
        name: 'Weight',
        series: this.userWeightData.weight
      }
    ];
  }

  public getUserMacros() {
    return this.userData.fitnessProfile.macros;
  }

  /**
   *
   * @param arg Object to update weight in database server
   */

  public addWeight(arg: {value: number, name: string}) {
    console.log(arg.value);
    console.log(arg.name);

    // Assume date is not found
    this.found = false;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.userWeightData.weight.length; index++) {
      if ( this.userWeightData.weight[index].name ===  arg.name) {
        // Matching date found, update the weight
        this.found = true;
        this.userWeightData.weight[index].value = arg.value;
      }
    } // End for

    // If the date doesn't exist, then add the new entry
    if (this.found === false) {
      this.userWeightData.weight.push(arg);
    }

    // To fix live updating graph

  }


}
