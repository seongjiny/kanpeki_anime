var mongoose = require('mongoose');
var userSchema  = new mongoose.Schema({
    userName: String,
    password: String,
    profile: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        intro:String
    },
    list: [String]
});

mongoose.model('User', userSchema);