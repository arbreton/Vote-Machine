'use strict'
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
    citizen.electoralCode = req.body.electoralCode;
    citizen.name=req.body.name;  

    citizen.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Citizen created!' });
    });
})

//Get information of the current election
.get('/currentElection',function(req, res) {
	var from=new Date();
	from.setHours(-8,0,0,0);
	var to=new Date();
	to.setHours(-8,0,0,0);
	to.setDate(from.getDate()+1);
    Election.find({'electionDay':{$gte: from, $lt:to}}, function(err, election) {
        if (err)
            res.send(err);
        res.json(election);
    });
})

//get the data of the current election (if there is one)
.get('/currentElection2',function(req, res) {
	var from=new Date();
	from.setHours(-8,0,0,0);
	var to=new Date();
	to.setHours(-8,0,0,0);
	to.setDate(from.getDate()+1);
	Election.aggregate(
    { 
        $match: 
            { "electionDay": from }
    }       
    ).exec(function(err, election) {
        if (err)
            res.send(err);
        res.json(election);
    });
})

//Get the current citizen info if he/she already voted in the selected election
.get('/currentElection3/:electionID/:citizenID',function(req, res) {
	Citizen.find({'_id': req.params.citizenID,'votes.electionID': req.params.electionID}, function(err, citizens) {
        if (err)
            res.send(err);
        res.json(citizens);
    });
})

//Register a vote in an election
.put('/elections/:electionID/:candidateID/:citizenID',function(req, res) {
          
    Election.findById(req.params.electionID, function(err, election) {
        if (err)
            return res.send(err);
        //Prepare data in an object to insert
        var voteItem={};
        voteItem.name=req.body.name;
        voteItem.gender=req.body.gender;
        voteItem.provinceCode=req.body.provinceCode;
        voteItem.age=req.body.age;
        voteItem.hour=req.body.hour;
        voteItem.ethnicity=req.body.ethnicity;
        election.votes.push(voteItem);
        election.save(function(err) {
            if (err){
            	console.log(err);
            	return res.send(err);
            }
        res.json({ message: 'Vote added!' });
        });

    });        
})

//Register that a citizen voted in an election
.put('/elections/vote/:electionID/:candidateID/:citizenID',function(req, res) {
	
    Citizen.findById(req.params.citizenID, function(err, citizen) {
        if (err)
            res.send(err);
        //Prepare data in an object to insert
        var voteItem={};
        voteItem.electionID=req.params.electionID;
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



