var mongoose = require('mongoose');
var contactSchema  = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    homePhone: String,
    cellPhone: String,
    birthDay: Date,
    website: String,
    address: String
});

mongoose.model('Contact', contactSchema);