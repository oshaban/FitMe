/* 
    API endpoint for /api/users
*/

const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 
const { User } = require('../models/userSchema'); // Loads User collection
const { Weight } = require('../models/weightSchema'); // Loads Weight collection

const Joi = require('@hapi/joi'); // For HTTP request body validation
const bcrypt = require('bcryptjs'); // Used to hash passwords
const auth = require('../middleware/auth'); // Middleware for auth
const fit = require('../lib') // Used to calculate user fitness profile

// GET /api/users
    // Body response: Returns all users from the 'Users' collection
router.get('/', async function(req,res) {
    try{
        // Returns all users, excluding the password
        const allUserDocs = await User.find().select({password: 0});
        // console.log(process.env.JWTPRIVATEKEY);
        res.send(allUserDocs);
    } catch(error) {
        res.status(500).send('Something failed');
    }
});

// GET /api/users/me
    // Body response: Returns to current user
    // End point is only available to authenticated users
router.get('/me', auth, async function(req,res) {
    try {
        const user = await User.findById(req.user._id).select({password: 0});
        res.send(user);
    } catch(error) {
        res.status(500).send('Something failed');
    }

});

// POST /api/users/
    // Creates a new user: Calculates TDEE and fitness profile
router.post('/', async function(req,res) {
    
    // Check if the HTTP request body is valid
    if( !validateUser(req.body) ) {
        // Invalid input
        return res.status(400).send('Bad Request');
    }

    // Check if user is already registered
    try{
        //Check if user is already registered
        let user = await User.findOne({username: req.body.username}); //user is null if not registered
        if(user) return res.status(400).send('User already registered');

        // If user is not registered, generate fitness profile:
        const calories = fit.getCals(req.body.fitnessProfile);
        const macros = fit.getMacros(req.body.fitnessProfile);

        // Stores today's date for today's weight
        const today = new Date();

        // Create new document
        user = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            fitnessProfile: {
                startWeight : {weight: req.body.fitnessProfile.startWeight, date: today},
                goal: req.body.fitnessProfile.goal,
                gender: req.body.fitnessProfile.gender,
                height: req.body.fitnessProfile.height,
                birthDay: req.body.fitnessProfile.birthDay,
                activityMultiplier: req.body.fitnessProfile.activityMultiplier,
                recommendedCalories: calories,
                macros: macros
            }
        });

        // Hash password 
        const salt = await bcrypt.genSalt(10); // Generates a salt
        user.password = await bcrypt.hash(user.password,salt);

        // Save user document to DB
        const resultUser = await user.save();
        // console.log(resultUser);

        // Save initial weight to DB
        weight = new Weight({
            user: user._id,
            weight: [
                {value: user.fitnessProfile.startWeight.weight, name: today}
            ]
        });

        // Save weight document to DB
        const resultWeight = await weight.save();
        // console.log(resultWeight); 

        // Create a JWT for auth
        const token = user.generateAuthToken(); 

        // Sends document back to front-end, along with JWT in header
        res.header('x-auth-token', token)
            .send({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            });

    } catch(error) {
        res.status(500).send('Something failed');
    }
      
});


/**
 * Returns true if valid request body, otherwise returns false
 * @param {*} user User object from HTTP request body
 */
function validateUser(user) {

    /**
     * Defines shape of HTTP request body. Used for Joi validation.
     */
    const userInputSchema = Joi.object().keys({
        username: Joi.string().min(5).max(20).alphanum().required(),
        firstname: Joi.string().min(3).max(20).regex(/^[A-Za-z]+$/).required(),
        lastname: Joi.string().min(3).max(20).regex(/^[A-Za-z]+$/).required(),
        password: Joi.string().min(8).max(25).required(),
        fitnessProfile : {
            startWeight: Joi.number().min(10).max(500).required(),
            height: Joi.number().min(1).max(144).required(),
            gender: Joi.string().valid('M','F').required(),
            birthDay: Joi.date().required(),
            activityMultiplier: Joi.number().required(),
            goal: Joi.number().valid(-1,-0.5,0,0.5,1).required(),
        }
    });
    
    const result = Joi.validate(user,userInputSchema); // result.error === null -> input is valid

    if(result.error === null) {
        return true
    } else {
        console.log(result.error); // Log the error
        return false
    }

}

// Sample POST request format
/* {
	"username":"testing123",
	"firstname":"John",
	"lastname":"Doe",
	"password":"testpass",
	"fitnessProfile":{
        "startWeight": "81",
        "height": 120,
		"gender":"M",
		"birthDay":"2000-08-05T12:54:48.944Z",
        "activityMultiplier": "1",
        "goal": "1",
	}
} */

module.exports = router // Exports router 