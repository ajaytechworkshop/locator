let express = require('express');
//location model object
let LocationModel = require('../model/locationSchema');
let router = express.Router();

//save the tagged location
router.post('/location', (req, res) => {
    console.log(req);
    if (!req.body) {
        return res.status(400).sendFile('Request body is required');
    }
    new LocationModel(req.body).save()
        .then(doc => {
            if (!doc || doc.length == 0) {
                return res.status(500).send(doc);
            }
            console.log("Document saved to DB.." + doc);
            res.status(201).send(doc);
        }).catch(err => {
            res.status(500).json(err);
        });
});


//get all locations
router.get('/location/all', (req, res) => {
    LocationModel.find()
        .then(doc => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            console.log("REsponse.." + doc);
            res.send(JSON.stringify(doc));
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

//get the location by id
router.get('/location/:id', (req, res) => {
    LocationModel.findById(`${req.params.id}`)
        .then(doc => {
            if (!doc || doc.length == 0) {
                return res.status(404).send(doc);
            }
            res.status(200).send(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update the location
router.put('/location/:id', (req, res) => {
    console.log(`Updating location..${req.params.id}`);
    console.log(req.body);
    LocationModel.findOneAndUpdate({
        _id: `${req.params.id}`
    }, req.body, { new: true })
        .then(doc => {
            console.log('Location updated' + doc);
            res.json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete location
router.delete('/location/:id',(req, res) => {
    LocationModel.findByIdAndDelete({
        _id: `${req.params.id}`
    }).then(doc => {
        console.log('Location deleted successfully');
        res.status(202).send(doc);
    })
});

module.exports = router;