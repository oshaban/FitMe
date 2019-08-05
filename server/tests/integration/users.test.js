const request = require('supertest'); // Used for mock HTTP requests
const {Weight} = require('../../models/'); // Weight model
const {User} = require('../../models/userSchema'); // User model
const mongoose = require('mongoose');

// Note: Prior to running: set NODE_ENV = test

let server; // Stores server 

describe('/api/users', ()=>{

    // Load server before each test
    beforeEach(()=>{
        server = require('../../../server');
    });

    // Close server after each test
    afterEach(()=>{
        await .remove({});
        await server.close();
    });

    describe('GET /me', ()=>{
        it('should return all users', async()=>{
            const res = await request(server).get('/api/users');
            expect(res.status).toBe(200);
        });
    });

})