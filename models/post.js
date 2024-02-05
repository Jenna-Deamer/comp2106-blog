let mongoose = require('mongoose');

// define blog post model for CRUD
let post = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

// make the model public so the controllers can use it
module.exports = mongoose.model('Post', post);