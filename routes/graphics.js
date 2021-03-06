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
    citizen.electoralCode = req.body.electoralCode;
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
            menTotal: { $sum: 1 }
        }
    },
    {
        $sort:
            { "menTotal": -1 }
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
            womenTotal: { $sum: 1 }
        }
    },
    {
        $sort:
            { "womenTotal": -1 }
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
            womenTotal: { $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] } },
            menTotal:{ $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] } }
        }
    },
    {
        $sort:
            { "womenTotal": -1 }
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
.get('/elections/graph/:electionDate/votes/:time',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
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
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
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
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/district/:electionDate/:provinceCode',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
  ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/age/:electionDate/:age',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtAge/:electionDate/:provinceCode/:age',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/hour/:electionDate/:hour',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtHour/:electionDate/:provinceCode/:hour',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/ageHour/:electionDate/:age/:hour',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtAgeHour/:electionDate/:provinceCode/:age/:hour',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/ethnic/:electionDate/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtEthnic/:electionDate/:provinceCode/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/ageEthnic/:electionDate/:age/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtAgeEthnic/:electionDate/:provinceCode/:age/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/hourEthnic/:electionDate/:hour/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/districtHourEthnic/:electionDate/:provinceCode/:hour/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/ageHourEthnic/:electionDate/:age/:hour/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the votes for each candidate in an election during a specific hour
.get('/elections/graph/interactive/:electionDate/:provinceCode/:age/:hour/:ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $match:
            { "votes.provinceCode": req.params.provinceCode }
    },
    {
        $match:
            { 'votes.age': {$gte: parseInt(req.params.age), $lt: parseInt(req.params.age)+10} }
    },
    {
        $match:
            { "votes.hour": req.params.hour }
    },
    {
        $match:
            { "votes.ethnicGroup": req.params.ethnicGroup }
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
            Total: { $sum: 1 }
        }
    }
    ]).exec(function(err, election) {
        if (err)
            res.send(err);
        console.log(election);
        res.json(election);
    });
})

//Get the number of votes per hour, separated by gender
.get('/elections/graph/:electionDate/time',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $group: {
            _id: "$votes.hour",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } }
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
.get('/elections/graph/:electionDate/votes',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $group: {
            _id: "$votes.name",
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } },
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
.get('/elections/graph/:electionDate/age',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date(req.params.electionDate) }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $group: {
            _id: '$votes.age',
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1"] } , 1, 0 ] } },
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
.get('/elections/graph/ethnicGroup',function(req, res) {
    Election.aggregate([
    {
        $match:
            { "electionDay": new Date("2017-01-12T00:00:00.000Z") }
    },
    {
        $unwind:
            "$votes"
    },
    {
        $group: {
            _id: '$votes.ethnicGroup',
            womenTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "2" ] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$votes.gender", "1" ] } , 1, 0 ] } },
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
            _id: { $substr: [ "$birthDate", 0, 4 ] },
            womenTotal:{ $sum: { $cond: [ { $eq: [ "$gender", "2"] } , 1, 0 ] } },
            menTotal: { $sum: { $cond: [ { $eq: [ "$gender", "1"] } , 1, 0 ] } },
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
