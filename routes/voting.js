var express = require('express');
var mongoose = require('mongoose'); 
var Citizen=mongoose.model('Citizen'); //get Citizen model
var app = express();  // get an instance of the express Router






// ROUTES FOR OUR API
// =============================================================================
//Add a new citizen to the database
app.post('/citizens', function(req, res) {
  var citizen = new Citizen();
  citizen.electoral_code = req.body.electoral_code;
  citizen.name=req.body.name;  // set the bears name (comes from the request)

  citizen.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Citizen created!' });
        });
})
.put('/citizens/:citizen_id',function(req, res) {
        
        console.log(req.body);
        //Find to which citizen the vote will be registered
        Citizen.findById(req.params.citizen_id, function(err, citizen) {

            if (err)
                res.send(err);
            //Prepare data in an object to insert
            var presidential={};
            presidential.name=req.body.name;
            presidential.first_lastname=req.body.first_lastname;
            presidential.second_lastname=req.body.second_lastname;
            presidential.proposals=req.body.proposals;
            var partyObj={};
            partyObj.code=req.body.code;
            partyObj.description=req.body.description;
            presidential.party=partyObj;
            presidential.election_date=req.body.election_date;
            var votestatus={};
            votestatus.vote_date=req.body.vote_date;
            votestatus.vote_hour=req.body.vote_hour;
            votestatus.voted=req.body.voted;
            presidential.vote_status=votestatus;
            presidential.others=req.body.others;

            //Insert the vote
            citizen.candidates.presidential.push(presidential);
            //Save the vote
            citizen.candidates.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Citizen updated!' });
            });

        });
    });

module.exports = app;