var mongoose = require('mongoose');
var animeSchema  = new mongoose.Schema({
    title: String,
    animedb_id:String,
    startDate:String,
    endDate:String,
    poster:String,
    episodes: String,
});

mongoose.model('Anime', animeSchema);