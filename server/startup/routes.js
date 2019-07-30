/* 
    Module exports a startup function that registers all the API endpoint routes
        Load/import all router modules here, then register them
*/

function loadRoutes(app) {
    // Loads routers modules
    const users = require('../routes/users')

    // Registers routes
    app.use('/api/users', users);

}

module.exports = loadRoutes