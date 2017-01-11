var express = require('express');
var mongoose = require('mongoose'); 
var Citizen=mongoose.model('Citizen'); //get Citizen model
var Election=mongoose.model('Election');

var app = express();  // get an instance of the express Router






// ROUTES FOR OUR API
// =============================================================================
//Add a new citizen to the database
app.post('/citizens', function(req, res) {
  var citizen = new Citizen();
  var election= new Election();
  citizen.electoral_code = req.body.electoral_code;
  citizen.name=req.body.name;  // set the bears name (comes from the request)

  citizen.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Citizen created!' });
        });
})
//Get information of all the registered citizens
.get('/currentElection',function(req, res) {
		var from=new Date();
		from.setHours(-8,0,0,0);
		console.log(from);
		var to=new Date();
		to.setHours(-8,0,0,0);
		to.setDate(from.getDate()+1);
		console.log(to);
        Election.find({'election_day':{$gte: from, $lt:to}}, function(err, election) {
            if (err)
                res.send(err);
            res.json(election);
        });
    })



.get('/currentElection2',function(req, res) {
	var from=new Date();
		from.setHours(-8,0,0,0);
		console.log(from);
		var to=new Date();
		to.setHours(-8,0,0,0);
		to.setDate(from.getDate()+1);
		console.log(to);
		Election.aggregate(
            { $match: {"election_day":from }}
            
            ).exec(function(err, election) {
            if (err)
                res.send(err);
            res.json(election);
        });
    })
.get('/currentElection3/:election_id/:citizen_id',function(req, res) {
		Citizen.find({'_id':req.params.citizen_id,'votes.electionID':req.params.election_id}, function(err, citizens) {
            if (err)
                res.send(err);

            res.json(citizens);
        });
    })
.put('/elections/:election_id/:candidate_id/:citizen_id',function(req, res) {
                //Find to which citizen the vote will be registered
          
        	Election.findById(req.params.election_id, function(err, election) {
            if (err)
                return res.send(err);
            console.log(election);
            console.log('No error');
            //Prepare data in an object to insert
            var voteItem={};
            voteItem.name=req.body.name;
            voteItem.gender=req.body.gender;
            voteItem.province_code=req.body.province_code;
            voteItem.age=req.body.age;
            voteItem.hour=req.body.hour;
            voteItem.ethnicity=req.body.ethnicity;
            console.log(election);
            //Insert the vote
            election.votes.push(voteItem);
            //Save the vote
            console.log(election);
            election.save(function(err) {
                if (err){
                	console.log(err);
                	return res.send(err);
                }
                console.log("yayasdufsdalsdafkjlhgfsdalsdafkjl");
                res.json({ message: 'Vote added!' });
            });

        });

        
    })

.put('/elections/vote/:election_id/:candidate_id/:citizen_id',function(req, res) {
                //Find to which citizen the vote will be registered
          
        
			Citizen.findById(req.params.citizen_id, function(err, citizen) {

            if (err)
                res.send(err);
            //Prepare data in an object to insert
            var voteItem={};
            voteItem.electionID=req.params.election_id;
            //Insert the vote
            citizen.votes.push(voteItem);
            //Save the vote
            citizen.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Vote registered!' });
            });

        });

        
    });

module.exports = app;



