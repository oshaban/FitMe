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
 * Generates TDEE based on fitness profile
 * @param { {startWeight: number, height: number, gender: string, birthDay: Date, activityMultiplier: number, goal: number} fitnessProfile 
 */
function getTDEE(fitnessProfile) {

    let baseCals;

    // https://www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf
    if(fitnessProfile.gender === "M") {
        baseCals = 66 + (13.7 * fitnessProfile.startWeight) + (5 * fitnessProfile.height) + (6.8 * getAge(fitnessProfile.birthDay));
    } else {
        baseCals= 665 + (9.6 * fitnessProfile.startWeight) + (1.8 * fitnessProfile.height) + (4.7 * getAge(fitnessProfile.birthDay));
    }

    const TDEE = (baseCals * fitnessProfile.activityMultiplier);
    
    return TDEE;
}

/**
 * Generates recommended calories based on fitness profile
 * @param { {startWeight: number, height: number, gender: string, birthDay: Date, activityMultiplier: number, goal: number} fitnessProfile 
 */
function getCals(fitnessProfile) {

    let tdee = getTDEE(fitnessProfile)

    let caloricSurplus = 0;
    // Calculate caloric surplus based on fitnessProfile goal
    switch (fitnessProfile.goal) {
        case 1:
            caloricSurplus = 200;
            break;
        
        case 0.5:
            caloricSurplus = 100;
            break;

        case 0:
            caloricSurplus = 0
            break;

        case -0.5:
            caloricSurplus = -100;
            break;

        case -1:
            caloricSurplus = -200;
            break;
    
        default:
            break;
    }

    return tdee + caloricSurplus;

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
    getMacros,
    getAge,
    getTDEE
}