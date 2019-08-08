let express = require('express');
//location model object
let LocationModel = require('../model/locationSchema');
let router = express.Router();

//save the tagged location
router.post('/location',(req, res) => {
    if(!req.body){
        return res.status(400).sendFile('Request body is required');
    }
    new LocationModel(req.body).save()
    .then(doc =>
    {
        if(!doc || doc.length == 0){
            return res.status(500).send(doc);
        }
        console.log("Document saved to DB.."+doc);
        res.status(201).send(doc);
    }).catch(err => {
        res.status(500).json(err);
    });
});


//get all locations
router.get('/locations',(req, res)  => {
   LocationModel.find()
            .then(doc => {
            if(!doc || doc.length == 0){
                return res.status(404).send(doc);
            }
            res.status(200).send(doc);
        }).catch(err => {
            res.status(500).json(err);
    });

});

//get the location by id
router.get('/location/:id',(req, res) => {
    LocationModel.findById(`${req.params.id}`)
        .then(doc => {
            if(!doc || doc.length == 0){
                return res.status(404).send(doc);
            }
            res.status(200).send(doc);
        }).catch(err => {
        res.status(500).json(err);
    });
});

//update the location
router.put('/location/:id', (req, res) =>
{
    console.log(`Updating location..${req.params.id}`);
    LocationModel.findOneAndUpdate({
       _id: `${req.params.id}`},req.body,{new: true})
        .then(doc => {
            console.log('Location updated'+doc);
            res.json(doc);
        }).catch(err =>{
            console.log(err);
            res.status(500).json(err);
    });
});

module.exports = router;