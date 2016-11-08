var mongoose = require('mongoose');
var animeSchema  = new mongoose.Schema({
    title: String,
    language: String,
    episode: Number,
    type:String,
    status:String,
    startDate:Date,
    endDate:Date,
    synopsis:String,
    poster:String,
    

});

mongoose.model('Anime', animeSchema);