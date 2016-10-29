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
    // GET all contacts
    .get(function (req, res, next) {
        mongoose.model('Contact').find({}, function (err, contact) {
            if (err) {
                return console.log(err); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        });
    })
    .post(function (req, res) { // CONSIDER: can add a next parameter for next middleware to run in the middleware chain
        mongoose.model('Contact').create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            homePhone: req.body.homePhone,
            cellPhone: req.body.cellPhone,
            birthDay: req.body.birthDay,
            website: req.body.website,
            address: req.body.address
        }, function (err, contact) {
            if (err) {
                res.send('Problem adding contact to db.'); // CONSIDER: Might want to call next with error.  can add status code and error message.
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        })
    });


// route middleware to validata :id
router.param('id', function (req, res, next, id) {
    mongoose.model('Contact').findById(id, function (err, contact) {
        if (err || contact === null) {
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

// CHALLENGE:  Implement these API endpoints before next class
router.route('/:id')
    .get(function (req, res) {
        mongoose.model('Contact').findById(req.id, function (err, contact) {
            if (err) {
                res.status(404);
                handleError(err, res, 'GET error, problem retrieving data');
            } else {
                res.format({
                    json: function () {
                        res.json(contact);
                    }
                });
            }
        });
    })
    .put(function (req, res) {
        mongoose.model('Contact').findById(req.id, function (err, contact) {
            contact.firstName = req.body.firstName || contact.firstName;
            contact.lastName = req.body.lastName || contact.lastName;
            contact.email = req.body.email || contact.email;
            contact.homePhone = req.body.homePhone || contact.homePhone;
            contact.cellPhone = req.body.cellPhone || contact.cellPhone;
            contact.birthDay = req.body.birthDay || contact.birthDay;
            contact.website = req.body.website || contact.website;
            contact.address = req.body.address || contact.address;
            contact.save(function (err, person) {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem updating contact');
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
        mongoose.model('Contact').findByIdAndRemove(req.id)
            .exec(
            function (err, contact) {
                if (err) {
                    res.status(404);
                    handleError(err, res, 'Problem deleting contact');
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
