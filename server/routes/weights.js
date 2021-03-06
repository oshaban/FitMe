/* 
    API endpoint for /api/weights
*/

const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 
const { User } = require('../models/userSchema'); // Loads User collection
const { Weight } = require('../models/weightSchema'); // Loads Weight collection

const Joi = require('@hapi/joi'); // For HTTP request body validation

// GET /api/weights
    // Body response: Returns all weights from 'Weights' collection
router.get('/', async function(req,res) {
    
    try{
        const weights = await Weight.find(); // Finds all user weights
        res.send(weights[0].weight);
    } catch(error) {
        res.status(500).send('Something failed');
    }

});

// GET /api/weights/me
    // Body response: Returns weight of current user
    // End point is only available to authenticated users
router.get('/me', auth, async function(req,res) {
    try {
        const weight = await Weight.findOne({user: req.user._id}) // Gets all the weights of user with user._id
        res.send(weight);
    } catch(error) {
        res.status(500).send('Something failed');
    }

});

// POST /api/weights/me
    // Adds weight to weights array in DB
router.post('/me', auth, async function(req,res) {

    // Check if the HTTP request body is valid
    if( !validateWeight(req.body) ) {
        // Invalid input
        return res.status(400).send('Bad Request');
    }

    try{

        // Find existing weight document for the user
            // req.user is added by auth middle-ware
        const weightDoc = await Weight.findOne({user: req.user._id});

        // Convert req.body.date to date object
        dateEntry = new Date(req.body.date);

        // Check if the weight on the given date exists
        let index = weightDoc.weight.findIndex(function(obj) {
            if( obj.name.getFullYear() === dateEntry.getFullYear() &&
                obj.name.getMonth() === dateEntry.getMonth() &&
                obj.name.getDate() === dateEntry.getDate()
            ) return true
        }); // Searches weightDoc to find index of existing date

        if(index != -1) {
            // Weight on the given date exists, update existing date
            weightDoc.weight[index].value = req.body.weight;
            await weightDoc.save();
        } else{
            // Otherwise add new weight to the document
            weightDoc.weight.push({
                value: req.body.weight,
                name: req.body.date
            });
        }

        // Save document
        const resultWeight = await weightDoc.save();

        // Send new weight document back to front-end
            //resultWeight contains the entire user weight document
        // console.log(resultWeight.weight[resultWeight.weight.length - 1]  );
        res.send( resultWeight.weight[resultWeight.weight.length - 1] );


    } catch(error) {
        res.status(500).send('Something failed');
    }
        
});

// PUT /api/weights/me/:id
// Updates weight document of the user
    // Body response: Returns updated weight of user
    // End point is only available to authenticated users
router.put('/me/:id', auth, async function(req,res) {

    // Check if the HTTP request body is valid
    if( !validateWeight(req.body) ) {
        // Invalid input
        return res.status(400).send('Bad Request');
    }

    try{

        enteredID = req.params.id; //Gets dynamic route parameter

        // Finds weight document for user
        const userWeights = await Weight.findOne( {'weight._id' : enteredID} )

        if (userWeights === null) {
            // Weight with ID was not found
            res.status(404).send('Weight with given ID is not found');
        } else {
            // Update the document

            userWeights.weight.id(enteredID).value = req.body.weight
            weightDoc = userWeights.weight.id(enteredID).name = new Date(req.body.date);
            
            // Find
            userWeights.save(); // Save main document
            res.send(weightDoc);
        }

    } catch(error) {
        res.status(500).send('Something failed');
    }
        
});

// DELETE /api/weights/me/:id
    // Deletes weight document of the user
    // Body response: Returns deleted weight document of user
    // End point is only available to authenticated users
router.delete('/me/:id', auth, async function(req,res) {
    
    try {
        enteredID = req.params.id; //Gets dynamic route parameter

        const userWeights = await Weight.findOne( {'weight._id' : enteredID} )

        if (userWeights === null) {
            // Weight with ID was not found
            res.status(404).send('Weight with given ID is not found');
        } else {
            weightDel = userWeights.weight.id(enteredID).remove(); // Remove subdocument
            userWeights.save(); // Save main document
            res.send(weightDel);
        }

    } catch(error) {
        res.status(500).send('Something failed');
        console.log(error);
    }

});


/**
 * Returns true if valid request body, otherwise returns false
 * @param {*} user 
 */
function validateWeight(weight) {

    /**
     * Defines shape of HTTP request body. Used for Joi validation.
     */
    const weightInputSchema = Joi.object().keys({
        weight: Joi.number().min(10).max(500).required(),
        date: Joi.date().required(),
    });
    
    const result = Joi.validate(weight,weightInputSchema); // result.error === null -> input is valid

    if(result.error === null) {
        return true
    } else {
        // console.log(result.error); // Log the error
        return false
    }

}

// Sample POST request format
/* {
	"weight":"150",
	"date":"2000-08-05T12:54:48.944Z"
	}
} */


module.exports = router // Exports router 