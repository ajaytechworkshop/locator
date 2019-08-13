let mongoose =  require('mongoose');

//For running in docker container. Mongo runs on a container name 'mongo'
//const dbServer = 'mongo';
//For running in local machine
const dbServer = 'localhost';

const dbPort = '27017';
const dbName = 'geolocator';

//Local Mongo connection String
mongoose.connect(`mongodb://${dbServer}:${dbPort}/${dbName}`,{useNewUrlParser: true})
.then(() => console.log('Mongo DB Connected....'))
.catch((err) => console.log(err));

//Atlas Mongo db connection String
//mongoose.connect('mongodb+srv://mongouser:mongouser@mongoone-lz8dp.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true})
//.then(() => console.log('Mongo DB Connected'));

module.exports = mongoose;