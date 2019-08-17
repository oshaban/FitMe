/**
 * Interface for POST request to /api/users/
 */
export interface UserFormData {
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    fitnessProfile: {
        startWeight: number;
        goal: number;
        gender: string;
        height: number;
        birthDay: Date;
        activityMultiplier: number;
    };
}
