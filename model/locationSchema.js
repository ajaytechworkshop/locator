let mongoose = require('../config/database');

let LocationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
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

module.exports = mongoose.model('Location',LocationSchema);