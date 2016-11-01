var mongoose = require('mongoose');

// Changes to file
// Will be used to define a function to accept 
// message and callback function
var gracefulShutdown;
var dbURI = 'mongodb://localhost/animedb';
mongoose.connect(dbURI);

// Emulating disconnection events on Windows
var readLine = require ("readline");
if (process.platform === "win32"){
    var rl = readLine.createInterface ({
        input: process.stdin,
        output: process.stdout
    });
    rl.on ("SIGINT", function (){
        process.emit ("SIGINT");
    });
}

// CONNECTION EVENTS
// Monitoring for successful connection through Mongoose
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

// Checking for connection error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

// Checking for disconnection event
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    // Close Mongoose connection, passing through an 
    // anonymous function to run when closed
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// Listens for SIGUSR2, which is what nodemon uses when it restarts app
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
// Use plural form of name
require('./users');
require('./animes');
