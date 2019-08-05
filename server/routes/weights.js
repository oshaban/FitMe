/* 
    API endpoint for /api/weights
*/

const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 
const {User} = require('../models/userSchema'); // Loads User collection
const {Weight} = require('../models/weightSchema'); // Loads Weight collection

const Joi = require('@hapi/joi'); // For HTTP request body validation

// GET /api/weights
    // Body response: Returns all weights from 'Weights' collection
router.get('/', async function(req,res) {
    
    const weights = await Weight.find(); // Finds all user weights
    res.send(weights);

});

// GET /api/weights/me
    // Body response: Returns to current user
    // Requires client to send JWT to server
router.get('/me', function(req,res) {
    res.send('test');

    // TO DO
    
});

// GET /api/weights/me
    // Body response: Returns weight of current user
    // End point is only available to authenticated users
router.get('/me', auth, async function(req,res) {
    try {
        const weight = await Weight.findOne({user: req.user._id}); // Gets all the weights of user with user._id
        res.send(weight);
    } catch(error) {
        console.log(error);
    }

});

module.exports = router // Exports router 