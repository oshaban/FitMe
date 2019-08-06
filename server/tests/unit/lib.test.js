const mongoose = require('mongoose');
const fit = require('../../lib');


// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 

describe('lib.js', ()=>{

    // Initialize data for testing
    let mockUserM;
    let mockUserF;

    beforeEach(()=> {

        mockUserM = {
            username: "testuserM",
            firstname: "John",
            lastname: "Doe",
            password: "8charpas",
            fitnessProfile:{
                startWeight: 81,
                goal: 1,
                gender: "M",
                height: 182,
                birthDay: "2000-08-05T12:54:48.944Z",
                activityMultiplier: "1"
            }
        };
    
        mockUserF = {
            username: "testuserF",
            firstname: "John",
            lastname: "Doe",
            password: "8charpas",
            fitnessProfile:{
                startWeight: 81,
                goal: 1,
                gender: "F",
                height: 182,
                birthDay: "2000-08-05T12:54:48.944Z",
                activityMultiplier: 1
            }
        };

    }); // END beforeEach()
    

    describe('getCals()', ()=>{
        
        it('should return calories using M profile if fitnessProfile is M', async()=> {
            
            const cals = fit.getCals(mockUserM.fitnessProfile);

            let baseCals = 66
            + (13.7 * mockUserM.fitnessProfile.startWeight)
            + (5 * mockUserM.fitnessProfile.height)
            + (6.8 * fit.getAge(mockUserM.fitnessProfile.birthDay) );

            let tdee = (baseCals * mockUserM.fitnessProfile.activityMultiplier);
            
            let caloricSurplus = 200

            let result = tdee + caloricSurplus;

            expect(result).toBe(cals);

        });

        it('should return calories using F profile if fitnessProfile is F', async()=> {
            
            const cals = fit.getCals(mockUserF.fitnessProfile);

            let baseCals = 665
            + (9.6 * mockUserF.fitnessProfile.startWeight)
            + (1.8 * mockUserF.fitnessProfile.height)
            + (4.7 * fit.getAge(mockUserF.fitnessProfile.birthDay) );

            let tdee = (baseCals * mockUserF.fitnessProfile.activityMultiplier);
            
            let caloricSurplus = 200

            let result = tdee + caloricSurplus;

            expect(result).toBe(cals);

        });

    }); // END getCals()

    describe('getMacros()', ()=>{

    }); //END getMacros()

}); // END test lib.js

