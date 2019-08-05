const request = require('supertest'); // Used for mock HTTP requests
const { Weight } = require('../../models/'); // Weight model
const { User } = require('../../models/userSchema'); // User model
const mongoose = require('mongoose');

// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 

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

describe('/api/users', ()=>{

    // Load server before each test
    beforeEach(()=>{
        server = require('../../../server');
    });

    // Close server after each test
    afterEach( async ()=>{
        await User.remove({});
        await server.close();
    });

    describe('GET /me', ()=>{
        
        it('should return a 401 if client is not logged in', async()=> {
            const res = await request(server).get('/api/users/me');
            expect(res.status).toBe(401);
        });
        
        
        it('should return current user', async()=>{

            // Populate the database with a user:
            await User.collection.insertOne(mockUser);

            const res = await request(server).get('/api/users/me');
            expect(res.s)
            expect(res.status).toBe(200);
        });
    });

})