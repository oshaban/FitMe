/* 
    This module sets configuration settings and loads middle-ware
*/
const result = require('dotenv').config() //Loads vars from .env file into environment variables
const helmet = require('helmet'); // Secures express applications
const compression = require('compression'); // Nodejs compression middle-ware
const cors = require('cors'); // Cors middleware

function config(express, app) {
    
    // Checks if dotenv successfully sets the env vars
    if(result.error) {
        console.log(result.error);
        process.exit(1);
    }

    // Loads middle-ware:
    app.use(express.json()); // Middleware to parse incoming JSON HTTP requests
    app.use(compression());
    app.use(helmet());
    app.use(cors());
}

module.exports = config