const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Course
let Course = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
},{
    collection: 'courses'
});

module.exports = mongoose.model("Course", Course);