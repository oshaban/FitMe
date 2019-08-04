import { Injectable } from '@angular/core';

/**
 * @title User Fitness Data Service
 * Used to get fitness data from the current user
 */

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

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
      { value: 160, name: new Date(2019, 8, 4).toISOString() },
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
   * Returns a users TDEE; Calculated using Harris-Benedict formula
   */
  public getUserTDEE() {

    this.wtinkg = 54.5;
    this.htincm = 167.6;
    this.ageInYrs = 30;

    if (this.userData.fitnessProfile.gender === 'M') {
      this.BMR = 66 + (13.7 * this.wtinkg) + (5 * this.htincm) - (6.8 * this.ageInYrs);
    } else {
      this.BMR = 665 + (9.6 * this.wtinkg) + (1.8 * this.htincm) - (4.7 * this.ageInYrs);
    }

    return Math.floor(this.BMR * this.userData.fitnessProfile.activityMultiplier);

  }

  /**
   * Returns a users goal in format {goalType: number, perWeek: number}
   */
  public getUserGoal() {
    return this.userData.fitnessProfile.goal;
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

  constructor() { }

}
