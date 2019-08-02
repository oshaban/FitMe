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
        gender: 'F',
        height: 72,
        birthDay: new Date(2019, 1, 1),
        activityMultiplier: 1,
    }
  };

  private userWeightData =  {
    _id: 899,
    weight: [
      {date: new Date(2019, 8, 1), value: 150 },
      {date: new Date(2019, 8, 2), value: 160 },
      {date: new Date(2019, 8, 3), value: 170 }
    ]
  };
  /**
   * Stores a users latest Weight
   * Used in getCurrentWeight()
   */
  latestWeight: {date: Date, value: number};

  /**
   * Stores a users TDEE
   */
  BMR: number;

  /**
   * Stores a users weight in KG
   */
  wtinkg: number;

  /**
   * Stores a users height in CM
   */
  htincm: number;

  /**
   * Stores a users age in years
   */
  ageInYrs: number;

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
   * Uses the Harris-Benedict formula to calculate a users TDEE
   */
  public getTDEE() {

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

  constructor() { }
}
