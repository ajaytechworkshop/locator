let mongoose =  require('mongoose');

const dbServer = 'localhost';
const dbPort = '27017';
const dbName = 'geolocator';

mongoose.connect(`mongodb://${dbServer}:${dbPort}/${dbName}`);

module.exports = mongoose;

