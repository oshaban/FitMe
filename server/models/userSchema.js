
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    goals: String
});

module.exports = userSchema;