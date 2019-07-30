/* 
    Module exports a startup function that runs startup code for data-base
*/

const mongoose = require('mongoose');

function dbConnect() {

    // Print the environment system is running on:
    console.log(`Running on ${process.env.NODE_ENV} environment`);

    let uri; // Stores database uri

    // Connection options:
    let options = {
        useNewUrlParser: true
    }

    // Checks application environment
    if(process.env.NODE_ENV === 'production') {
        uri = process.env.DB_PROD; // Use production database
        options.dbName = process.env.DB_NAME; // Add MongoDB Atlas database name
    } else if(process.env.NODE_ENV === 'test') {
        uri = process.env.DB_HOST_TEST; // Use test database
    } else {
        uri = process.env.DB_HOST_DEV; // Loads development database
    }

    // Connects to MongoDB database
    mongoose.connect(uri, options)
    .then(() => console.log(`Connected to ${uri}`) )
    .catch((error) => {
        console.log('Could not connect to MongoDB: ' + error)
        process.exit(1);
    });
}

module.exports = dbConnect;