var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
var passport = require('passport');

// connect MongoDB+
mongoose.connect('mongodb://localhost:27017/mean-database', function(err,db){
    if (!err){
        console.log('Connected to /mean-database!');
    } else{
        console.dir(err); //failed to connect
    }
});

require('./models/Posts');
require('./models/Comments');
//require('./models/Users');
require('./models/citizens');
require('./config/passport');
require('./models/candidate');
require('./models/Provinces');


var routes = require('./routes/index');
//var users = require('./routes/users');

var citizens = require('./routes/citizens');
var candidates = require('./routes/candidates');
var provinces = require('./routes/provinces');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());



app.use('/', routes);
app.use('/users', citizens);
app.use('/api', candidates);
app.use('/api', provinces);
//app.use('/api', citizens);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
