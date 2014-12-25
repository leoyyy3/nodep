var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var partials = require('express-partials');
var util = require('util');
var connect = require("connect");
var MongoStore = require("connect-mongo")(connect);
var db = require('models/db');

var app = express();

app.use(express.cookieParser());
app.use(express.session({
    secret:settings.cookieSecret,
    store:new MongoStore({
        host:settings.host, port:settings.port, db:settings.db
    })
}))
// view engine setup
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');


app.use(partials())

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/test/:username',function(req,res,next){
    console.log('all method is call');
    res.send('all 的路由a')
});
app.use('/login',login);

//片段视图
// app.use('/list',function(req,res){
//     res.render('list',{
//         title:'片段视图ul',
//         items:['marico',1991,'pact']
//     })
// });

//试图助手
// app.locals({
//     inspect:function(obj){
//         return util.inspect(obj,true)+'解析成功';
//     }
// })

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
