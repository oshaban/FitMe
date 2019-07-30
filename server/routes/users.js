/* 
    API endpoint for /api/users
*/

const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 
const mongoose = require('mongoose'); // Loads mongoose for DB queries

const userSchema = require('../models/userSchema'); // Loads Mongoose userSchema
const userDB = mongoose.model('Users', userSchema); // Creates a new DB collection 'Users'

// GET /api/users
    // Body response: Returns all users from the 'Users' collection
router.get('/', function(req,res) {
    res.send('test');
});

// GET /api/users/:id
    // Body response: Returns a user with 'id' from the 'Users' collection
router.get('/:id', function(req,res) {
    res.send(req.params.id);
});


module.exports = router // Exports router 