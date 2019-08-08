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
        
        it('should return TDEE using M profile if fitnessProfile is M', async()=> {
            
            const cals = fit.getTDEE(mockUserM.fitnessProfile);

            wtinkg = mockUserM.fitnessProfile.startWeight / 2.2; // 1 kg = 2.2 lbs
            htincm = mockUserM.fitnessProfile.height * 2.54; // 1 in = 2.54 cm

            let baseCals = 66
            + (13.7 * wtinkg)
            + (5 * htincm)
            + (6.8 * fit.getAge(mockUserM.fitnessProfile.birthDay) );

            let tdee = (baseCals * mockUserM.fitnessProfile.activityMultiplier);
            
            let caloricSurplus = 200

            let result = tdee + caloricSurplus;

            expect(tdee).toBe(cals);

        });

        it('should return TDEE using F profile if fitnessProfile is F', async()=> {
            
            const cals = fit.getTDEE(mockUserF.fitnessProfile);

            wtinkg = mockUserF.fitnessProfile.startWeight / 2.2; // 1 kg = 2.2 lbs
            htincm = mockUserF.fitnessProfile.height * 2.54; // 1 in = 2.54 cm

            let baseCals = 665
            + (9.6 * wtinkg)
            + (1.8 * htincm)
            + (4.7 * fit.getAge(mockUserF.fitnessProfile.birthDay) );

            let tdee = (baseCals * mockUserF.fitnessProfile.activityMultiplier);

            expect(tdee).toBe(cals);

        });

    }); // END getCals()

    describe('getMacros()', ()=>{

    }); //END getMacros()

}); // END test lib.js

