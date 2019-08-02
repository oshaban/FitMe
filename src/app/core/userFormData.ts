/**
 * Interface for user data which is sent to back-end for user registration
 */
export interface UserFormData {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    fitnessProfile: {
        startWeight: { weight: number, date: Date };
        gender: string;
        height: number;
        birthDay: Date;
        activityMultiplier: number;
        goal: { goalType: string, perWeek: number};
    };
}
