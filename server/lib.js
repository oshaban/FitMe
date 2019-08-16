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

    wtinkg = fitnessProfile.startWeight / 2.2; // 1 kg = 2.2 lbs
    htincm = fitnessProfile.height * 2.54; // 1 in = 2.54 cm

    // https://www.k-state.edu/paccats/Contents/PA/PDF/Physical%20Activity%20and%20Controlling%20Weight.pdf
    if(fitnessProfile.gender === "M") {
        baseCals = 66 + (13.7 * wtinkg) + (5 * htincm) + (6.8 * getAge(fitnessProfile.birthDay));
    } else {
        baseCals= 665 + (9.6 * wtinkg) + (1.8 * htincm) + (4.7 * getAge(fitnessProfile.birthDay));
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
        // 3500*(weekly gain or loss in lbs) / 7 
    switch (fitnessProfile.goal) {
        case 1:
            caloricSurplus = 500;
            break;
        
        case 0.5:
            caloricSurplus = 250;
            break;

        case 0:
            caloricSurplus = 0
            break;

        case -0.5:
            caloricSurplus = -250;
            break;

        case -1:
            caloricSurplus = -500;
            break;
    
        default:
            break;
    }

    return Math.floor(tdee + caloricSurplus);

}

/**
 * Generates the number of macros based on fitness profile
 * @param { {startWeight: number, goal: number, gender: string, height: number, birthday: string, activityMultiplier: number } } fitnessProfile 
 */
function getMacros(fitnessProfile) {
    
    calories = getCals(fitnessProfile); // Find total number of calories

    /** Amount of fat in grams  */
    fat = 0;

    /** Amount of protein in grams  */
    protein = 0;

    /** Amount of carbs in grams  */
    carbs = 0;

    if(fitnessProfile.goal >= 0) {
        // User is bulking or maintaining
        fat = (calories*0.3)/9; // Fat is ~30% of weight, 9 grams/cal 
        protein = (fitnessProfile.startWeight * 1.2); // Protein is 1.2 grams / bodyweight

    } else {
        // User is cutting
        fat = (calories*0.24)/9; // Fat is ~24% of weight, 9 grams/cal
        protein = fitnessProfile.startWeight * 1.4; // Protein is 1.4 grams / bodyweight

    }

    // Carbs is remainder
    carbs = ( calories - ((fat*9) + (protein*4) ) ) / 4;
    
    // Round values
    carbs = Math.round(carbs)
    fat = Math.round(fat);
    protein = Math.round(protein);

    return {protein: protein, fat: fat, carbs: carbs}
}

module.exports = {
    getCals,
    getMacros,
    getAge,
    getTDEE
}