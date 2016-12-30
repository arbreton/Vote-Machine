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
//Get information of all the registered citizens
.get('/citizens',function(req, res) {
        Citizen.find(function(err, citizens) {
            if (err)
                res.send(err);

            res.json(citizens);
        });
    })
//Get the citizens that voted in a certain election, chosen by date
.get('/citizens/:election_date',function(req, res) {
        Citizen.find({'candidates.presidential.election_date':req.params.election_date}, function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });
    })
//Get the citizens that voted in a certain election, chosen by date

.get('/citizens/graph/gender/m',function(req, res) {

        Citizen.aggregate(
            [{ $match: {gender: "1"}},
            { $group: { _id: "$province.district",Men_Total:{ $sum: 1}}},
            { $sort: {"Men_Total":-1}},
            {$limit:15}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })

.get('/citizens/graph/gender/f',function(req, res) {
        Citizen.aggregate(
            [{ $match: {gender: "2"}},
            { $group: { _id: "$province.district",Women_Total:{ $sum: 1}}},
            { $sort: {"Women_Total":-1}},
            



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
.get('/citizens/graph/gender/both',function(req, res) {
        Citizen.aggregate(
            [
            { $group: { _id: "$province.district",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }}}},

            { $sort: {"Women_Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

.get('/citizens/graph/gender/time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},
            { $group: { _id: "$candidates.presidential.vote_status.vote_hour",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }}}},

            { $sort: {"_id":+1}}
            //{$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

//Which ages vote at which hour
.get('/citizens/graph/hour/:hour',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.vote_status.vote_hour": req.params.hour}},
            { $group: { _id: "$age",Total:{ $sum: 1}}},
            { $sort: {"Total":-1}}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })
//At which hour people of certain age vote
.get('/citizens/graph/ages/:age',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"age": req.params.age}},
            { $group: { _id: "$candidates.presidential.vote_status.vote_hour",Total:{ $sum: 1}}},
            { $sort: {"Total":-1}}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })

//Districts that vote at an hour
.get('/citizens/graph/candidates/:time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},
            {$match:{"candidates.presidential.vote_status.vote_hour": req.params.time}},
            { $group: { _id: "$candidates.presidential.name",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
//Districts that vote at an hour
.get('/citizens/graph/districts/:time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},


            {$match:{"candidates.presidential.vote_status.vote_hour": req.params.time}},
            { $group: { _id: "$province.district",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
//Votes per hour for candidate
.get('/citizens/graph/votes/:time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},


            {$match:{"candidates.presidential.vote_status.vote_hour": req.params.time}},
            { $group: { _id: "$candidates.presidential.name",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

//Districts that vote early
.get('/citizens/graph/vote',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},
            { $group: { _id: {name:"$candidates.presidential.name",first_lastname:"$candidates.presidential.first_lastname"},Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

//Candidates votes
.get('/citizens/graph/vote2',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidates.presidential.election_date": "12-13-2016"}},
            { $group: { _id: "$candidates.presidential.name",Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
           



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

//age
.get('/citizens/graph/age',function(req, res) {
       Citizen.aggregate(
           [
           { $group: { _id: { $substr: [ "$birth_date", 0, 4 ] } ,Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] }},
           Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},
           { $sort: {"_id":+1}},

           ]).exec(function(err, citizen) {
           if (err)
               res.send(err);
           res.json(citizen);
       });

   })

//Insert a vote into the database
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