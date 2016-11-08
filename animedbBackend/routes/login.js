
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParse = require('cookie-parser');
var jwtAuth = require('express-jwt');


var mongoose = require('mongoose'), // mongodb connection
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


router.route('/')
     .post(function(req, res){
     	console.log("hit login");
     	console.log(req.body.username);
  		if (!req.body.username) {
    		return res.status(401).send("Send a username to login");
  		}

  		// var user = {
    // 		name: req.body.username
  		// }

  		if (!req.body.password) {
    		return res.status(401).send("Send a passowrd to login");
  		}

  		// var password = {
    // 		name: req.body.password
  		// };


  		console.log("get username and password");

  		res.status(200).send("get username and password");
});


// function login() {
//   return jwtAuth({
//     secret: process.env.USER_SECERT
//   });
// };
   


function handleError(err, res, msg) {
    err = new Error(msg);
    err.status = 404;
    res.format({
        json: function () {
            res.json({ message: err.status + ' ' + err });
        }
    });
}


//module.exports = login;    

module.exports = router;  