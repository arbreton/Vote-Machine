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

//Get the 15 districts with the highest number of males
.get('/citizens/graph/gender/m',function(req, res) {

    Citizen.aggregate([
    { 
        $match: 
            { gender: "1" } 
    },
    { 
        $group: { 
            _id: "$province.district", 
            Men_Total: { $sum: 1 } 
        } 
    },
    { 
        $sort: 
            { "Men_Total": -1 }
    },
    {
        $limit:
            15
    }
    ]).exec(function(err, citizen) {
        if (err)
            res.send(err);
        res.json(citizen);
    });

})

//Get the 15 districts with the highest number of females
.get('/citizens/graph/gender/f',function(req, res) {
        
    Citizen.aggregate([
    { 
        $match: 
            { gender: "2" }
    },
    { 
        $group:{ 
            _id: "$province.district",
            Women_Total: { $sum: 1 } 
        }
    },
    { 
        $sort: 
            { "Women_Total": -1 }
    },
    ]).exec(function(err, citizen) {
        if (err)
            res.send(err);
        res.json(citizen);
    });
})

//Get the 5 disctricts with the highest female population, including number of males
.get('/citizens/graph/gender/both',function(req, res) {
    
    Citizen.aggregate([
    { 
        $group: { 
            _id: "$province.district",
            Women_Total: { $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] } },
            Men_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] } }
        }
    },
    { 
        $sort: 
            { "Women_Total": -1 }
    },
    {
        $limit:
            5
    }
    ]).exec(function(err, citizen) {
        if (err)
            res.send(err);
        res.json(citizen);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/votes/:time',function(req, res) {
    Election.aggregate([
    {  
        $match: 
            { "election_day": new Date("2017-01-11T00:00:00.000Z") }
    },          
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.hour": req.params.time }
    },
    { 
        $group: { 
            _id: "$votes.name",
            Women_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    },
    { 
        $sort: 
            { "Total": -1 }
    },
    {   
        $limit:5
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        res.json(election);
    });
})

//Get the number of votes per hour, separated by gender
.get('/elections/graph/gender/time',function(req, res) {
    Election.aggregate([
    { 
        $match: 
            { "election_day": new Date("2017-01-11T00:00:00.000Z") }
    },
    {
        $unwind:
            "$votes"
    },
    { 
        $group: { 
            _id: "$votes.hour",
            Women_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } }
        }
    },
    { 
        $sort: 
            { "_id": +1 }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        res.json(election);
    });
})

//Get the votes for each candidate in an election
.get('/elections/graph/votes',function(req, res) {
    Election.aggregate([
    { 
        $match: 
            { "election_day": new Date("2017-01-11T00:00:00.000Z") }
    },
    {
        $unwind: 
            "$votes"
    },
    { 
        $group: { 
            _id: "$votes.name",
            Women_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } },
            Total: { $sum: 1 } 
        }
    },
    {   
        $sort: 
            { "Total": -1 }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes by age in an election
.get('/elections/graph/age',function(req, res) {
    Election.aggregate([
    {
        $match: 
            { "election_day": new Date("2017-01-11T00:00:00.000Z") }
    },
    {
        $unwind:
            "$votes"
    },
    { 
        $group: { 
            _id: '$votes.age',
            Women_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1} 
        }
    },
    { 
        $sort: 
            { "_id": +1 } 
    }
    ]).exec(function(err, citizen) {
        if (err)
            res.send(err);
        res.json(citizen);
    });
})

//Get the votes in an election by ethnic group
.get('/elections/graph/ethnic_group',function(req, res) {
    Election.aggregate([
    {
        $match: 
            { "election_day": new Date("2017-01-11T00:00:00.000Z") }
    },
    {
        $unwind: 
            "$votes"
    },
    { 
        $group: { 
            _id: '$votes.ethnic_group',
            Women_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    },
    { 
        $sort: 
            { "_id": +1 } 
    },
    ]).exec(function(err, citizen) {
        if (err)
           res.send(err);
       res.json(citizen);
   });
})

//Get the citizens ordered by birth year
.get('/citizens/graph/age',function(req, res) {
    Citizen.aggregate([
    { 
        $group: { 
            _id: { $substr: [ "$birth_date", 0, 4 ] },
            Women_Total:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] } },
            Men_Total: { $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] } },
            Total:{ $sum: 1} 
        } 
    },
    { 
        $sort: 
            { "_id": +1 }
    }
    ]).exec(function(err, citizen) {
        if (err)
           res.send(err);
        res.json(citizen);
    });
})

module.exports = app;