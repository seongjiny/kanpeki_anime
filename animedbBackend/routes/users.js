var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParse = require('cookie-parser');
var jwtAuth = require('express-jwt');



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

router.route('/login')
    .post(function (req, res) {
        console.log("hit login");
        if (!req.body.userName) {
            res.status(400).send('username required');
            console.log("no username");
            return;
        }
        if (!req.body.password) {
            res.status(400).send('password required');
            console.log("no password");
            return;
        } else {
            return jwtAuth({
                secret: process.env.USER_SECERT
            });
        }
    });

router.route('/:username/:animeid')
    .put(function (req, res){
        mongoose.model('User').find({"userName": req.params.username},function(err, user){
            if(err){
                console.log(err);
            }else{
                if(user[0].list.indexOf(req.params.animeid)==-1){
                    user[0].list.push(req.params.animeid);
                user[0].save(function (err, user){
                    if(err){
                        handleError(err,res,"could not update list",400);
                    }else{
                        res.status(204);
                        res.json(user[0]);
                    }
                })
                }else{
                    res.status(204);
                    res.json(user[0]);
                }
            }
        });
    });


// READY to build our API
router.route('/')
    // GET all users
    .get(function (req, res) {
        if (req.body.userName) {
            mongoose.model('User').find({
                userName: req.body.userName,
                password: req.body.password
            }, function (err, user) {
                if (err) {
                    console.log("error occurred login");
                    return console.log(err);
                } else {
                    res.send("login succeed");
                    console.log(user);
                    res.format({
                        json: function () {
                            res.json(user);
                        }
                    });
                }
            });
        } else {
            mongoose.model('User').find({
                // userName:req.body.userName,
                // password:req.body.password
            }, function (err, user) {
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
        }
    })
    .post(function (req, res) {
        mongoose.model('User').count({
            userName: req.body.userName
        }, function (err, count) {
            if (err) {
                return console.log(err);
            } else {
                if (count == 0) {
                    mongoose.model('User').create({
                        userName: req.body.userName,
                        password: req.body.password
                    }, function (err, user) {
                        if (err) {
                            res.send('Problem adding user to db.'); // CONSIDER: Might want to call next with error.  can add status code and error message.
                        } else {
                            res.format({
                                json: function () {
                                    res.json({ username: user.userName });
                                }
                            });
                        }
                    })
                    console.log("New User is successfully added");
                    return 0; //succeed adding to user
                } else {
                    console.log("Duplicate userName");
                    return -1;
                }
            }
        });
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
        console.log(req.body);
        mongoose.model('User').findById(req.id, function (err, user) {
            user.password = req.body.password || user.password;
            user.profile.firstName = req.body.firstName || user.profile.firstName;
            user.profile.lastName = req.body.lastName || user.profile.lastName;
            user.profile.email = req.body.email || user.profile.email;
            user.profile.intro = req.body.intro || user.profile.intro;
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
            });
    });

module.exports = router;

