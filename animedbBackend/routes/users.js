var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParse = require('cookie-parser');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

// READY to build our API
router.route('/')
    // GET all users
    .get(function (req, res, next) {
        mongoose.model('User').find({}, function (err, user) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(user);
                    }
                });
            }
        });
    })
    .post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
        console.log("abc");
        mongoose.model('User').create({
            userName: req.body.userName,
            password: req.body.password

          }, function (err, user) {
            if (err) {
                res.send('Problem adding user to db.'); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(user);
                    }
                });
            }
        })
    });


// route middleware to validata :id
router.param('id', function (req, res, next, id) {
    mongoose.model('User').findById(id, function (err, user) {
        if (err || user === null) {
            res.status(404);
            handleError(err, res, 'Not found');
        } else {
            // once validation is done, save new id in the req
            req.id = id;
            next();
        }
    });
});


function handleError(err, res, msg) {
    err = new Error(msg);
    err.status = 404;
    res.format({
        json: function () {
            res.json({ message: err.status + ' ' + err });
        }
    });
}

router.route('/:id')
    .get(function (req, res) {
        mongoose.model('User').findById(req.id, function (err, user) {
            if (err) {
                res.status(404);
                handleError(err, res, 'GET error, problem retrieving data');
            } else {
                res.format({
                    json: function () {
                        res.json(user);
                    }
                });
            }
        });
    })
    .put(function (req, res) {
        mongoose.model('User').findById(req.id, function (err, user) {
            user.userName = req.body.userName || user.userName;
            user.password = req.body.password || user.password;
            user.save(function (err, person) {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem updating user');
                } else {
                    res.format({
                        json: function () {
                            res.json(person);
                        }
                    });
                }
            });
        });
    })
    .delete(function (req, res) {
        mongoose.model('User').findByIdAndRemove(req.id)
            .exec(
            function (err, user) {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem deleting user');
                } else {
                    res.status(204);
                    res.format({
                        json: function () {
                            res.json(null);
                        }
                    });
                }
            }
            );
    });


module.exports = router;

