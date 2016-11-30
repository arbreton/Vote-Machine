// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var cons = require('consolidate');

// Conexión a base de datos
mongoose.connect('mongodb://admin:root@ds153667.mlab.com:53667/mean-database');


// Inicializar Express
var app = express();


// Require static assets from public folder
app.engine('html', cons.swig)
app.set('view engine', 'html');
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/public/views'));




// Template engine
//app.set('view engine', 'ejs');

// Configuracion
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static(__dirname + 'public'));

// Rutas de las API


// Inicio
app.get('/votingapp', function (req, res) {
	res.render('index', {page: 'index'});
});
/*
// Rutas de las vistas
app.get('/votacion', function (req, res) {
	res.render('votacion');
});

app.get('/admin/candidatos', function (req, res) {
	res.render('registrocandidatosview');
});*/



// Inicializar servidor
var server = app.listen(3000, function () {
	console.log("Servidor votingApp corriendo en puerto 3000");
});
