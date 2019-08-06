const request = require('supertest'); // Used for mock HTTP requests
const { Weight } = require('../../models/weightSchema'); // Weight model
const { User } = require('../../models/userSchema'); // User model
const mongoose = require('mongoose');

// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 


describe('/api/users', ()=>{

    // Load server before each test
    beforeEach(()=>{
        server = require('../../../server');
    });

    // Close server after each test
    afterEach( async ()=>{
        // Remove everything from DB
        await User.remove({});
        await Weight.remove({});
        await server.close();
    });

    describe('GET /me', ()=>{
        let mockUser = {
            username:"testuser",
            firstname:"John",
            lastname:"Doe",
            password:"8charpas",
            fitnessProfile:{
                startWeight: "81",
                goal: "1",
                gender:"M",
                height: 182,
                birthDay:"2000-08-05T12:54:48.944Z",
                activityMultiplier: "1"
            }
        };

        it('should return a 401 if client is not logged in', async()=> {
            const res = await request(server).get('/api/users/me');
            expect(res.status).toBe(401);
        });

        it('should return the user if client is logged in', async()=> {
            
            const user = new User(mockUser);
            const token = user.generateAuthToken()

            // Populate test database:
            await user.save();

            const res = await request(server)
                .get('/api/users/me')
                .set('x-auth-token',token);

            expect(res.status).toBe(200);
            expect(res.body.username).toBe("testuser");
        });
    
    });

    describe('POST /', ()=>{

        let mockUser;
        // Set data to POST to server
        beforeEach(()=> {
            mockUser = {
                username:"testuser",
                firstname:"John",
                lastname:"Doe",
                password:"8charpas",
                fitnessProfile:{
                    startWeight: "81",
                    goal: "1",
                    gender:"M",
                    height: 182,
                    birthDay:"2000-08-05T12:54:48.944Z",
                    activityMultiplier: "1"
                }
            };
        });

        const exec = async function() {
            return request(server).post('/api/users').send(mockUser);
        }

        it('should return a 400 if username is less than 5 chars', async()=> {
            mockUser.username="abcd";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if username is greater than 20 chars', async()=> {
            mockUser.username = new Array(22).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if username is not alpha-numeric', async()=> {
            mockUser.username = "username!"
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if firstname is less than 3 chars', async()=> {
            mockUser.firstname="ab";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if firstname is greater than 20 chars', async()=> {
            mockUser.firstname = new Array(22).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if firstname is not alpha-numberic', async()=> {
            mockUser.firstname = "firstn%ame!"
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if lastname is less than 3 chars', async()=> {
            mockUser.lastname="ab";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if lastname is greater than 20 chars', async()=> {
            mockUser.lastname = new Array(22).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if lastname is not alpha-numberic', async()=> {
            mockUser.lastname = "firstn%ame!"
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if password is less than 8 chars', async()=> {
            mockUser.password="1234567";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if password is greater than 25 chars', async()=> {
            mockUser.password = new Array(27).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        // Fitness profile
        it('should return a 400 if fitnessProfile startWeight is less than 10', async()=> {
            mockUser.fitnessProfile.startWeight = 9;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if fitnessProfile startWeight is greater than 500', async()=> {
            mockUser.fitnessProfile.startWeight = 501;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if fitnessProfile height is less than 1', async()=> {
            mockUser.fitnessProfile.height = 0;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if fitnessProfile height is greater than 1000', async()=> {
            mockUser.fitnessProfile.height = 1001;
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if gender is not M or F', async()=> {
            mockUser.fitnessProfile.gender = "A";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if activityMultiplier is not a number', async()=> {
            mockUser.fitnessProfile.activityMultiplier = "A";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return a 400 if goal is not a number', async()=> {
            mockUser.fitnessProfile.goal = "A";
            const res = await exec();
            expect(res.status).toBe(400);
        });

        // TO DO write success cases
    
    });

});
