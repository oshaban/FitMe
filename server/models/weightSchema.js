
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

/**
 * Shape of user weights saved to database
 */
const weightSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    weight: [
        {value: Number, name: Date}
    ]
});

/**
 * Creates a new DB collection 'Weight'
 */
const Weight = mongoose.model('Weight', weightSchema);

module.exports.Weight =  Weight;