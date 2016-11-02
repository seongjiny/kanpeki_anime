var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var uuid = require('node-uuid'); //token part
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');




// logger.token('id', function getId (req) { //token part
//   return req.id
// })

var db = require('./model/db');

var routes = require('./routes/index');
var users = require('./routes/users');
var animes = require('./routes/animes');
var users = require('./routes/users');

var app = express();
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressJWT({secret: 'JASON'}).unless({path: ('/login', '/users')}));
//app.use(assignId) //token part
//app.use(logger(':id :method :url :response-time')) //token part

// app.get('/', function (req, res) { //token test
//   res.send('hello, world! please log in')
// })
app.post('/login',function(req, res){
  console.log(req.body.userName);
  if(!req.body.userName){
    res.status(400).send('username required');
    console.log("no username");
    return;
  }
  if(!req.body.password){
    res.status(400).send('password required');
    console.log("no password");
    return;
  }

  // users.findOne({username: req.body.userName}, function(err, user){
  //   //console.log(username);
  //   user.comparePassword(req.body.password, function(err, isMatch){
  //     if (err) throw err;
  //     if(!isMatch){
  //       res.status(401).send('Invalid password');
  //       console.log("Invalid password");

  //     }else{
  //       res.status(200).send('render to somewhere');
  //       console.log("login");
  //     }
  //   });
  // }

  // )
        var myToken = jwt.sign({ username: req.body.userName}, 'JASON');
        res.status(200).json(myToken);
        //res.render('/');
        console.log("login");

}
);

// function assignId (req, res, next) { //token part
//   req.id = uuid.v4()
//   next()
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/animes', animes);
app.use('/users', users);

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
