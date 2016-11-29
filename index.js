// Dependencias
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Conexión a base de datos
mongoose.connect('mongodb://admin:root@ds153667.mlab.com:53667/mean-database');


// Inicializar Express
var app = express();

// Template engine
app.set('view engine', 'ejs');

// Configuracion
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Rutas de las API


// Inicio
app.get('/', function (req, res) {
	res.render('navar');
});

// Rutas de las vistas

app.get('/admin/dashboard', function (req, res) {
	res.render('admindash');
});

app.get('/votacion', function (req, res) {
	res.render('votacion');
});

app.get('/admin/candidatos', function (req, res) {
	res.render('registrocandidatosview');
});



// Inicializar servidor
var server = app.listen(3000, function () {
	console.log("Servidor votingApp corriendo en puerto 3000");
});
