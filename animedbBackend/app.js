var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var secret = 'mysecret';
var cors = require('cors'); 


var db = require('./model/db');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var animes = require('./routes/animes');
var users = require('./routes/users');
var login = require('./routes/login.js');

var app = express();
var cors = require('cors');
var key =  require('lodash');
var jwt = require('jsonwebtoken');
var jwtCheck = require('express-jwt');

//scopes
var checkScopes = require('./scopes.js');
var getScopesFrmoRequest = require('./scopes.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/animes', animes);
//app.use('/login', login);

app.get('/getTest', function(req, res){
 console.log("hit getTest");
});



app.post('/login', (req, res) => {
  if (!req.body.username) {

    return res.status(401).send("Send a username to login");
  } else if (!req.body.password) {
    return res.status(401).send("Send a passowrd to login");
  } else {
    mongoose.model('User').find({
      userName: req.body.username,
      password: req.body.password
    }, function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        // console.log(user[0].userName);
        console.log(data);
        var user = {
          name: req.body.username
        };
        if(data.length === 0){ //when user is not found with username and password
          res.status(404).send("User not found");
        }else{//user is found
          res.status(200).send({
            id_token: jwt.sign(user, secret),
            user: data[0]
          });
        }
      }
    });
  }

});



// app.post('/create-api-token', (req, res) => {
//   console.log("hit token");
//   res.status(201).send({
//     api_token: jwt.sign({
//         tenant: req.body.username,
//         scopes: getScopesFrmoRequest(req)
//       },
//       console.log(secret),
//       secret,
//       { expiresIn: 60*5 }
//       )
//   });
// });

app.use('/login', jwtCheck({secret: secret}));

// app.use('/login', jwtCheck({
//   //secret: process.env.API_SECRET,
//   secret: secret,
//   userProperty: 'token_payload'
// }));

// module.exports = function(app){
//   app.post('/login/follow', checkScopes(['follow']), (req, res) => {
//   return res.status(201).send({followed: true});
// });
// };

// module.exports = function(app){
//   app.get('/api/users/names', checkScopes(['read_users', 'read_names']), (req, res) => {
//   return res.status(201).send({names: true});
// });
// };


// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
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