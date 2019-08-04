import { Injectable } from '@angular/core';

/**
 * @title User Fitness Data Service
 * Used to get fitness data from the current user
 */

@Injectable({
  providedIn: 'root'
})

export class UserDataService {

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

  multi: any[] = [
    {
      name: 'Weight',
      series: [
        {
          value: 150,
          name: '2016-09-19T23:07:09.324Z'
        },
        {
          value: 200,
          name: '2016-09-14T19:19:47.323Z'
        },
        {
          value: 200,
          name: '2016-09-14T13:42:47.347Z'
        },
        {
          value: 200,
          name: '2016-09-23T04:14:51.090Z'
        },
        {
          value: 200,
          name: '2016-09-18T18:52:42.292Z'
        }
      ]
    },
  ];

  private userWeightData =  {
    _id: 899,
    weight: [
      {date: new Date(2019, 8, 1), value: 150 },
      {date: new Date(2019, 8, 2), value: 160 },
      {date: new Date(2019, 8, 3), value: 170 }
    ]
  };

  // Private data

  /**
   * Stores a users latest Weight
   * Used in getCurrentWeight()
   */
  private latestWeight: {date: Date, value: number};

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

    // latestWeight is an object with {date:.., value:..} form
    this.latestWeight = this.userWeightData.weight.reduce( function(r, a) {
      return r.date > a.date ? r : a;
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
   * Returns all the weights of a user
   */
  public getWeights() {
    return this.multi;
  }

  public getUserMacros() {
    return this.userData.fitnessProfile.macros;
  }

  constructor() { }
}
