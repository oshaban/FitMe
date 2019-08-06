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

    describe('POST /', ()=>{

        let mockUser;
        let mockReq;
        let token;

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
            const user = new User(mockUser);
            token = user.generateAuthToken();

            // Populate test user DB with user
            await user.save();

            // Test request to /api/weights/me
            mockReq = {
                weight: "150",
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

        // TO DO
    
    }); // End POST /me tests
    
}); //End /api/weights tests
