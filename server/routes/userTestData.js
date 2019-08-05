/**
 * Stores test data to mock server data 
 */

module.exports = [
{
    username: 'test123',
    firstname: 'Bill',
    lastname: 'Doe',
    password: 'test',
    fitnessProfile: {
        startWeight: {weight: 123, date: new Date()},
        goal: 11,
        gender: 'M',
        height: 72,
        birthDay: new Date(),
        activityMultiplier: 1,
        macros: {protein: 200, fat: 30, carbs: 50}
    }
},
{
    username: 'test123',
    firstname: 'Bill',
    lastname: 'Doe',
    password: 'test',
    fitnessProfile: {
        startWeight: {weight: 123, date: new Date()},
        goal: 1,
        gender: 'M',
        height: 72,
        birthDay: new Date(),
        activityMultiplier: 1,
        macros: {protein: 200, fat: 30, carbs: 50}
    }
},
]