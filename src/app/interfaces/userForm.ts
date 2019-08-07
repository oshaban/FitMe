/**
 * Interface for POST response to /api/users/
 */
export interface UserFormData {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    fitnessProfile: {
        startWeight: number;
        goal: number;
        gender: string;
        height: number;
        birthDay: Date;
        activityMultiplier: number;

    };
}
