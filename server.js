/* 
    Node.js back-end server
*/

// Creates an express application
const express = require('express'); // Load Express package
const app = express(); // Creates an express application
const path = require('path'); // For loading Angular application

// Load start-up modules
const loadConfig = require('./server/startup/config'); // For loading middle-ware
const loadRoutes = require('./server/startup/routes') // For loading routes
const loadDb = require('./server/startup/db') // For loading database

// Run start-up modules
loadConfig(express,app); // For loading middle-ware
loadRoutes(app); // For loading routes
loadDb(); // For loading database

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist/fitme'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/fitme/index.html'));
});

// Set port; Note: Use dotenv package to set env vars
const port = process.env.PORT || 8080;

// Runs the backend server
const server = app.listen(port, ()=> {console.log(`Back-end server running on: ${port}`)});
module.exports = server; // Exports server object for integration testing