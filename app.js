let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
const locationRouter = require('./routes/locationrouter');
const PORT = 3000;


//parse the incoming request body
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extend:true}));

//log the requests
app.use((req, res, next) => {
    console.log(`${new Date().toString()} --> ${req.originalUrl}`,req.body);
    next();
});

//register location router
app.use(locationRouter);
//server static pages
app.use(express.static('views'));

//404 error handler
app.use((req, res, next) => {
   res.status(404).send('The requested information does not exist');
});

//500 error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    //res.status(500).sendFile(path.join(__dirname,'../views/error.html'));
    res.status(500).send(err);
});

//run app on the server
app.listen(process.env.PORT || PORT, () => {
    console.info(`Locator app running on port ${PORT}`);
});
