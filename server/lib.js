/**
 * This contains helper functions to calculate a users fitness profile
  */

/**
 * 
 * @param {*} birthday Date ISOstring format of date
 * Calculates age of user, returning an integer
 */
function getAge(birthday) {

    const dobMs = Date.parse(birthday); // Returns ms from 1970 to birthday
    const ageDifMs = Date.now() - dobMs; // ms from birthday to today
    const ageDate = new Date(ageDifMs);
    return Math.abs( ageDate.getUTCFullYear() - 1970);

}

/**
 * Generates the number of calories based on input fitnessProfile
 * @param { {startWeight: number, goal: number, gender: string, height: number, birthday: string, activityMultiplier: number } } fitnessProfile 
 */
function getCals(fitnessProfile) {
    // console.log(fitnessProfile);

    let baseCals = 0;

    // https://www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf
    if(fitnessProfile.gender === "M") {
        baseCals = 66 + (13.7 * fitnessProfile.weight) + (5 * fitnessProfile.height) + (6.8 * getAge(fitnessProfile.DOB));
    } else {
        baseCals= 665 + (9.6 * fitnessProfile.weight) + (1.8 * fitnessProfile.height) + (4.7 * getAge(fitnessProfile.DOB));
    }

    const TDEE = (baseCals * fitnessProfile.activityMultiplier);

    const caloricSurplus = 200;

    return TDEE + caloricSurplus;

}

/**
 * Generates the number of macros based on fitness profile
 * @param { {startWeight: number, goal: number, gender: string, height: number, birthday: string, activityMultiplier: number } } fitnessProfile 
 */
function getMacros(fitnessProfile) {
    
    calories = getCals(fitnessProfile); // Find total number of calories
    
    return {protein: 200, fat: 30, carbs: 50}
}

module.exports = {
    getCals,
    getMacros
}