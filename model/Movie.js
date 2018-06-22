const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const MovieSchema = new Schema({
    movieName : {
        type : String,
        unique : true,
        required : [true, '{PATH} i Girmek Zorundasınız'],
    },
    category : {
        type : String,
        required : [true, '{PATH} i girmek zorundasınız']
    },
    country : String,
    addYear : {
        type :Number,
    },
    year : {
        type : Date,
        default : Date.now,
    },
    imdbScore : {
        type : Number,
    }
});

module.exports = mongoose.model('movie', MovieSchema);