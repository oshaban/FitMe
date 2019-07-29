/* 
    This is our main Node.js back-end server
*/

// Loads modules
require('dotenv').config() //Loads vars from .env file into environment variables
const express = require('express'); // Load Express package
const app = express(); // Creates an express application
const helmet = require('helmet'); // Secures express applications
const compression = require('compression'); // Nodejs compression middle-ware
const cors = require('cors'); // Cors middleware

// Load config settings and middleware:
app.use(express.json()); // Middleware to parse incoming JSON HTTP requests
app.use(compression());
app.use(helmet());
app.use(cors());

// Loads routers
const api = require('./server/api')

// Loads routers
app.use('/api/home',api);

// Set port 
const port = process.env.PORT || 3500;
    // Uses dotenv package to set env vars

// Runs the backend server
const server = app.listen(port, ()=> {
    console.log(`Back-end server running on: ${port}`)
});