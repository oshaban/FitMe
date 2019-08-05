/**
 * Contains authentication middleware
  */

const jwt = require('jsonwebtoken');

/**
 * Middle-ware function used to check if user is authorized to access api
  */
auth = function(req,res,next) {

    // Check if jwt is provided in HTTP request header
    const inputToken = req.header('x-auth-token');
    if(!inputToken) return res.status(401).send('Access denied. No token provided.');

    //Verify the token is valid using the jwt module
    try{
        const decodedPayload = jwt.verify(inputToken, process.env.JWTPRIVATEKEY); // Verify JWT 
        req.user = decodedPayload; // Add decoded payload to request body: JWT is signed with: jwt.sign({_id: this._id},..)
            //decodedPayload: {_id:..., iat:...}, where _id is the id of the user with the inputted JWT
        next(); // Pass control to next middle-ware function
    } catch(error) {
        res.status(400).send('Invalid token.')
    }

}

module.exports = auth