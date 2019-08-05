/* 
    API endpoint for /api/auth
*/

const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 
const { User } = require('../models/userSchema'); // Loads User collection
const bcrypt = require('bcryptjs'); // Used to validate password

const Joi = require('@hapi/joi'); // For HTTP request body validation


// POST /api/auth
    // Used to check if a user is authenticated or exists during logging in
router.post('/', async function(req,res) {
    
    // Check if the HTTP request body is valid
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0]);

    try{
        // Check if the entered user exists
        let user = await User.findOne({username: req.body.username}); //user is null if not registered
        if(!user) return res.status(400).send('Invalid email or password.');

        // If user exists, validate the password
        const validPassword = await bcrypt.compare(req.body.password, user.password); // Compare input password, with hashed password in DB

        // If password invalid, return
        if(!validPassword) return res.status(400).send('Invalid email or password.');

        // Login is valid, generate auth token and send back to client
        const token = user.generateAuthToken();
        res.send(token);

    } catch(error) {
        console.log(error);
    }
      
});


/**
 * Returns null if input is valid, otherwise returns an error object
 * @param {*} req 
 */
function validate(req) {
    
    const schema = Joi.object().keys({
        username: Joi.string().min(5).max(20).alphanum().required(),
        password: Joi.string().min(8).max(25).required(),
    });
    return Joi.validate(req, schema) // result.error === null -> input is valid
}

module.exports = router // Exports router 