const request = require('supertest'); // Used for mock HTTP requests
const { User } = require('../../models/userSchema'); // User model
const mongoose = require('mongoose');

// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 

describe('auth middleware', ()=>{
    let token;

    // Load server before each test
    beforeEach(()=>{
        server = require('../../../server');
        token = new User().generateAuthToken();
    });

    // Close server after each test
    afterEach( async ()=>{
        // Remove everything from DB
        await User.remove({});
        await server.close();
    });

    const exec = function() {
        return request(server)
            .get('/api/users/me')
            .set('x-auth-token', token)
    }
        
    it('should return a 401 if no token is provided', async()=> {
        token = '';
        const res = await exec();

        expect(res.status).toBe(401);
    });        
    
    it('should return a 400 if invalid token is provided', async()=> {
        token = 'a';
        const res = await exec();

        expect(res.status).toBe(400);
    }); 

});
