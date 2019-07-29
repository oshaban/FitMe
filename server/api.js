
const express = require('express'); // Loads express
const router = express.Router(); // Creates a router 

//Routing:
router.get('/', function(req,res) {
    res.send('hi');
});

module.exports = router // Exports router 