const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
    },
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now, // Fixed: Use Date.now as a function
    },
});

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;
