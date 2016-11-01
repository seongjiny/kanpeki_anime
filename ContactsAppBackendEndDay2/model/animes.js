var mongoose = require('mongoose');
var animeSchema  = new mongoose.Schema({
    userName: String
    // firstName: String,
    // lastName: String,
    // email: String,
    // homePhone: String,
    // cellPhone: String,
    // birthDay: Date,
    // website: String,
    // address: String
});

mongoose.model('Anime', animeSchema);