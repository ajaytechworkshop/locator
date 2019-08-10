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
    imageUrl: String
});

module.exports = mongoose.model('Location', LocationSchema);