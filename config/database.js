let mongoose =  require('mongoose');

const dbServer = 'localhost';
const dbPort = '27017';
const dbName = 'geolocator';
//Local Mongo connection String
mongoose.connect(`mongodb://${dbServer}:${dbPort}/${dbName}`);

//Atlas Mongo db connection String
//mongoose.connect('mongodb+srv://mongouser:mongouser@mongoone-lz8dp.mongodb.net/test?retryWrites=true&w=majority');

module.exports = mongoose;

