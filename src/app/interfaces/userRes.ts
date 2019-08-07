/**
 * Interface for GET response to /api/users/
 */
export interface UserGetData {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    fitnessProfile: {
        startWeight: {weight: number, date: Date};
        goal: number;
        gender: string;
        height: number;
        birthDay: Date;
        activityMultiplier: number;
        recommendedCalories: number;
        macros: {protein: number, fat: number, carbs: number};
    };
}
