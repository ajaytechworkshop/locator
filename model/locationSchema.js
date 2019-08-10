let mongoose = require('../config/database');

let LocationSchema = new mongoose.Schema({
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    },
    name: String,
    imageUrl: String,
    time: {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Location', LocationSchema);