var mongoose = require('mongoose');
var rankingSchema  = new mongoose.Schema({
    type: String, //like action, romance, etc
    animes:{
        rankingPoints: Number,
        anime_id:String
    }
});

mongoose.model('Ranking', rankingSchema);