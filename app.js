var express = require('express');
//var connect = require('connect');
var session = require('express-session')
const MongoStore = require('connect-mongo')(session);
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var app2 = connect();
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var options = {server: {socketOptions: {connectionTimeoutMS: 120000,socketTimeoutMS: 120000}}};


mongoose.connect('mongodb://localhost:27017/mean-database',options, function(err,db){
    if (!err){
        console.log('Connected to /mean-database!');
    } else{
        console.dir(err); //failed to connect
    }
});  

// connect MongoDB+

/*app.use(session({
    store: new MongoStore({  mongooseConnection: mongoose.connection}),
    //store: new MongoStore({ url: 'mongodb://localhost:27017/mean-database' }),
    secret: 'SECRET', cookie: { maxAge: 120000 },resave: false,
    saveUninitialized: false

}));
console.log('Connected to /mean-database!');


*/
  

require('./models/citizens');
require('./config/passport');
require('./models/Candidate');
require('./models/Province');
require('./models/Matches');

var routes = require('./routes/index');

var citizens = require('./routes/citizens');
var candidates = require('./routes/candidates');
var provinces = require('./routes/provinces');
var graphics = require('./routes/graphics');
var matches = require('./routes/matches');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
app.use('/api', graphics);
app.use('/api', citizens);
app.use('/api', matches)
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
