const mongoose = require('mongoose');
const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
        },
    urlQueue: [],
    userID: {
        type: String,
        required:true
    }
    });

    module.exports = mongoose.model('playlist',playlistSchema);