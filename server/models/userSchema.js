/**
 * Stores model for user schema, along with function to generate JWT for user
 */

const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

/**
 * Shape of user saved to database
 */
const userSchema = new Schema({
    username: String,
    firstname: String,
    lastname: String,
    password: String,
    fitnessProfile: {
        startWeight: {weight: Number, date: Date},
        goal: Number,
        gender: String,
        height: Number,
        birthDay: Date,
        activityMultiplier: Number,
        recommendedCalories: Number,
        macros: {protein: Number, fat: Number, carbs: Number}
    }
});

/**
 * Method on the user document to generate a JWT auth token
  */
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY);
    return token;
}

/**
 * Creates a new DB collection 'Users'
 */
const User = mongoose.model('Users', userSchema);

module.exports.User = User;