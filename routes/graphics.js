var express = require('express');
var mongoose = require('mongoose'); 
var Citizen=mongoose.model('Citizen'); //get Citizen model
var app = express();  // get an instance of the express Router






// ROUTES FOR OUR API
// =============================================================================
//Add a new citizen to the database
app.post('/citizens', function(req, res) {
  var citizen = new Citizen();
  citizen.clave_electoral = req.body.clave_electoral;
  citizen.nombre=req.body.nombre;  // set the bears name (comes from the request)

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
.get('/citizens/:fecha_eleccion',function(req, res) {
        Citizen.find({'candidatos.presidenciales.fecha_eleccion':req.params.fecha_eleccion}, function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });
    })
//Get the citizens that voted in a certain election, chosen by date

.get('/citizens/graph/gender/m',function(req, res) {

        Citizen.aggregate(
            [{ $match: {genero: "1"}},
            { $group: { _id: "$provincia.distrito",Total_de_hombres:{ $sum: 1}}},
            { $sort: {"Total_de_hombres":-1}}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })

.get('/citizens/graph/gender/f',function(req, res) {
        Citizen.aggregate(
            [{ $match: {genero: "2"}},
            { $group: { _id: "$provincia.distrito",Total_de_mujeres:{ $sum: 1}}},
            { $sort: {"Total_de_mujeres":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
.get('/citizens/graph/gender/both',function(req, res) {
        Citizen.aggregate(
            [
            { $group: { _id: "$provincia.distrito",Total_de_mujeres:{ $sum: { $cond: [ { $eq: [ "$genero", "2"] } , 1, 0 ] }},
            Total_de_hombres:{ $sum: { $cond: [ { $eq: [ "$genero", "1"] } , 1, 0 ] }}}},

            { $sort: {"Total_de_mujeres":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
.get('/citizens/graph/gender/time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidatos.presidenciales.fecha_eleccion": "12-13-2016"}},
            { $group: { _id: "$candidatos.presidenciales.estatus_votacion.hora_votacion",Total_de_mujeres:{ $sum: { $cond: [ { $eq: [ "$genero", "2"] } , 1, 0 ] }},
            Total_de_hombres:{ $sum: { $cond: [ { $eq: [ "$genero", "1"] } , 1, 0 ] }}}},

            { $sort: {"Total_de_mujeres":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })
//Which ages vote at which hour
.get('/citizens/graph/hour/:hour',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidatos.presidenciales.estatus_votacion.hora_votacion": req.params.hour}},
            { $group: { _id: "$edad",Total_de_personas:{ $sum: 1}}},
            { $sort: {"Total_de_personas":-1}}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })
//At which hour people of certain age vote
.get('/citizens/graph/ages/:age',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"edad": req.params.age}},
            { $group: { _id: "$candidatos.presidenciales.estatus_votacion.hora_votacion",Total_de_personas:{ $sum: 1}}},
            { $sort: {"Total_de_personas":-1}}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });

    })

//Districts that vote early
.get('/citizens/graph/districts/:time',function(req, res) {
        Citizen.aggregate(
            [{ $match: {"candidatos.presidenciales.fecha_eleccion": "12-13-2016"}},


            {$match:{"candidatos.presidenciales.estatus_votacion.hora_votacion": req.params.time}},
            { $group: { _id: "$provincia.distrito",Total_de_mujeres:{ $sum: { $cond: [ { $eq: [ "$genero", "2"] } , 1, 0 ] }},
            Total_de_hombres:{ $sum: { $cond: [ { $eq: [ "$genero", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

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
            [{ $match: {"candidatos.presidenciales.fecha_eleccion": "12-13-2016"}},
            { $group: { _id: {nombre:"$candidatos.presidenciales.nombre",ap_paterno:"$candidatos.presidenciales.ap_paterno"},Total_de_mujeres:{ $sum: { $cond: [ { $eq: [ "$genero", "2"] } , 1, 0 ] }},
            Total_de_hombres:{ $sum: { $cond: [ { $eq: [ "$genero", "1"] } , 1, 0 ] }},Total:{ $sum: 1}}},

            { $sort: {"Total":-1}},
            {$limit:5}



            ]).exec(function(err, citizen) {
            if (err)
                res.send(err);
            res.json(citizen);
        });


    })

//Edad
.get('/citizens/graph/age',function(req, res) {
        Citizen.aggregate(
            [{ $match: {genero: "1"}},
            { $group: { _id: "$edad",Total_de_Hombres:{ $sum: 1}}},
            { $sort: {"Total_de_hombres":-1}}



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
            var presidencial={};
            presidencial.nombre=req.body.nombre;
            presidencial.ap_paterno=req.body.ap_paterno;
            presidencial.ap_materno=req.body.ap_materno;
            presidencial.propuestas=req.body.propuestas;
            var partidoObj={};
            partidoObj.codigo=req.body.codigopartido;
            partidoObj.descripcion=req.body.descripcion;
            presidencial.partido=partidoObj;
            presidencial.fecha_eleccion=req.body.fecha_eleccion;
            var estatusvotacion={};
            estatusvotacion.fecha_votacion=req.body.fecha_votacion;
            estatusvotacion.hora_votacion=req.body.hora_votacion;
            estatusvotacion.voto=req.body.voto;
            presidencial.estatus_votacion=estatusvotacion;
            presidencial.otros=req.body.otros;

            //Insert the vote
            citizen.candidatos.presidenciales.push(presidencial);
            //Save the vote
            citizen.candidatos.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Citizen updated!' });
            });

        });
    });

module.exports = app;