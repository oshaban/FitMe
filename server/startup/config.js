/* 
    This module sets configuration settings and loads middle-ware
*/
const result = require('dotenv').config() //Loads vars from .env file into environment variables
const helmet = require('helmet'); // Secures express applications
const compression = require('compression'); // Nodejs compression middle-ware
const cors = require('cors'); // Cors middleware
const morgan = require('morgan'); // Logs HTTP requests

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
    app.use(cors({
        exposedHeaders: ['x-auth-token'],
    })); /* Exposes x-auth-token, so front end can get headers */
    // https://stackoverflow.com/questions/50779681/headers-not-showing-in-fetch-response

    // Only use morgan in dev environment
    if(process.env.NODE_ENV === 'development') {
        app.use(morgan('tiny'));
    }

}

module.exports = config