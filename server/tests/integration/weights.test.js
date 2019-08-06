const request = require('supertest'); // Used for mock HTTP requests
const { Weight } = require('../../models/weightSchema'); // Weight model
const { User } = require('../../models/userSchema'); // User model
const mongoose = require('mongoose');

// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 


describe('/api/weights', ()=>{

    // Load server before each test
    beforeEach(()=>{
        server = require('../../../server');
    }); // End beforeEach

    // Close server after each test
    afterEach( async ()=>{
        // Remove everything from DB
        await User.remove({});
        await Weight.remove({});
        await server.close();
    }); // End afterEach

    describe('GET /me', ()=>{

        // Mock test user to save to DB
        let mockUser = {
            username:"testing123",
            firstname:"John",
            lastname:"Doe",
            password:"8charpas",
            fitnessProfile: {
                startWeight: {weight: "81", date: "2019-08-06T11:18:13.367Z"},
                goal: "1",
                gender: "M",
                height: "182",
                birthDay: "2000-08-05T12:54:48.944Z",
                activityMultiplier: "1",
                recommendedCalories: "10",
                macros: {protein: "200", fat: "30", carbs: "50"}
            }
        };

        // Mock test weights to save to DB
        let mockWeights = {
            user: '',
            weight: []
        }

        it('should return a 401 if client is not logged in', async()=> {
            const res = await request(server).get('/api/weights/me');
            expect(res.status).toBe(401);
        });

        it('should return the weights for the user if client is logged in', async()=> {
            
            const user = new User(mockUser);
            const token = user.generateAuthToken();

            // Populate test user DB with user
            await user.save();

            // Populate test weight DB with weights
            mockWeights.user = user._id;
            mockWeights.weight.push({
                value: mockUser.fitnessProfile.startWeight.weight,
                name: mockUser.fitnessProfile.startWeight.date
            }); 

            const weight = new Weight(mockWeights);
            await weight.save();

            // Send GET request
            const res = await request(server)
                .get('/api/weights/me')
                .set('x-auth-token',token);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('weight');
            expect(res.body).toHaveProperty('user');
        });
    
    }); // End GET /me tests

    describe('POST /me', ()=>{

        let mockUser;
        let mockReq;
        let token;
        let user;

        // Set data to POST to server
        beforeEach(async ()=> {
            // Test user 
            mockUser = {
                username:"testing123",
                firstname:"John",
                lastname:"Doe",
                password:"8charpas",
                fitnessProfile: {
                    startWeight: {weight: "81", date: "2019-08-06T11:18:13.367Z"},
                    goal: "1",
                    gender: "M",
                    height: "182",
                    birthDay: "2000-08-05T12:54:48.944Z",
                    activityMultiplier: "1",
                    recommendedCalories: "10",
                    macros: {protein: "200", fat: "30", carbs: "50"}
                }
            };

            // Save test user to DB before each test, and generate a token to send with request
            user = new User(mockUser);
            token = user.generateAuthToken();

            // Populate test user DB with user
            await user.save();

            // Test weight
            mockWeight = {
                user: user._id,
                weight: [{
                    value: mockUser.fitnessProfile.startWeight.weight,
                    name: mockUser.fitnessProfile.startWeight.date,
                }]
            }

            // Populate test weight DB with weight
            weight = new Weight(mockWeight);
            await weight.save();

            // Test request to /api/weights/me
            mockReq = {
                weight: "150",
                date: "2000-08-05T12:54:48.944Z",
            }

            // Test request to /api/weights/me
            mockReq2 = {
                weight: "160",
                date: "2000-08-05T12:54:48.944Z",
            }

        }); // End beforeEach

        const exec = async function() {
            return request(server)
                .post('/api/weights/me')
                .set('x-auth-token', token)
                .send(mockReq);
        }

        it('should return a 401 if client is not logged in', async()=> {
            const res = await request(server).post('/api/weights/me').send(mockReq);
            expect(res.status).toBe(401);
        });

        it('should return a 400 if weight is less than 10', async()=> {
            mockReq.weight = 9;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if weight is greater than 500', async()=> {
            mockReq.weight = 501;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if weight is not a number', async()=> {
            mockReq.weight = "a"
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should save the weight in database if valid weight', async()=> {

            const res = await request(server)
                .post('/api/weights/me')
                .set('x-auth-token', token)
                .send(mockReq);

            const queryWeight = await Weight.findOne( {user: user._id} );
            // Gets weight document from for user

            // Finds sub-document containing the exact weight object
            let obj = queryWeight.weight.find(o => o.value == mockReq.weight );
            // console.log(obj);
            // console.log(queryWeight.weight);

            expect(res.status).toBe(200);
            expect(obj).not.toBeNull();

        });

        // TO DO
        it('should not create a new weight document if the date exists already', async()=> {

            // 1st POST with mockReq as request data
            const res1 = await request(server)
                .post('/api/weights/me')
                .set('x-auth-token', token)
                .send(mockReq);

            // 2nd POST request with mockReq as request data
            const res2 = await request(server)
                .post('/api/weights/me')
                .set('x-auth-token', token)
                .send(mockReq2);

            // weights array in document should remain size 2 (one for initial weight, one for 1st POST request)

            const queryWeight = await Weight.findOne( {user: user._id} );
            // Gets weight document from for user

            expect(res1.status).toBe(200);
            expect(res2.status).toBe(200);
            expect(queryWeight.weight.length).toBe(2);

        });
    
    }); // End POST /me tests
    
}); //End /api/weights tests
