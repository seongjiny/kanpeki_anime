var mongoose = require('mongoose');
var rankingSchema  = new mongoose.Schema({
    genre:String,
    anime_ids:[String]
});

mongoose.model('Ranking', rankingSchema);