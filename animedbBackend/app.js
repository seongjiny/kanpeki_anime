var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  secret = 'mysecret',

  db = require('./model/db'),
  mongoose = require('mongoose'),
  routes = require('./routes/index'),
  users = require('./routes/users'),
  animes = require('./routes/animes'),
  login = require('./routes/login'),

  app = express(),
  cors = require('cors'),
  key =  require('lodash'),
  jwt = require('jsonwebtoken'),
  jwtCheck = require('express-jwt'),
//scopes
  checkScopes = require('./scopes.js'),
  getScopesFrmoRequest = require('./scopes.js');



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

app.use('/', routes);
app.use('/users', users);
app.use('/animes', animes,jwtCheck({secret: secret}));
app.use('/users', users);



app.post('/login', (req, res) => {
  if (!req.body.userName) {
    return res.status(401).send("Send a username to login");
  } else if (!req.body.password) {
    return res.status(401).send("Send a passowrd to login");
  } else {
    console.log(req.body);
    mongoose.model('User').find({
      userName: req.body.userName,
      password: req.body.password
    }, function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        // console.log(data);
        var user = {
          name: req.body.userName
        };
        if (data.length === 0) { //when user is not found with username and password
          res.status(404).send("User not found");
        } else {//user is found
          res.format({
            json: function () {
              res.status(200).send({
                id_token: jwt.sign(user, secret),
                // user:data[0]
                username: data[0].userName,
                user_id:data[0]._id,
                profile: {
                  firstName: data[0].profile.firstName,
                  lastName: data[0].profile.lastName,
                  email: data[0].profile.email,
                  phoneNumber: data[0].profile.phoneNumber,
                  intro: data[0].profile.intro
                }

              });

            }
          });
        }
      }
    });
  }

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
