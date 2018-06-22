const express = require('express');
const router = express.Router();
const url = require('url');

//Model
const MovieSchema = require('../../model/Movie');

//movie list
router.get('/', (request, response, next) => {
    let promise = MovieSchema.find({});

    promise.then((data) => {
        if(data.length > 0){
            response.render('movie', {movieList : data, notification : request.query.valid});

        } else {
            response.render('movie', {noInformation : 'Görüntülenecek Film Yok Lütfen Film Ekleyin'} );
            
        }
    }).catch((error) => {
        response.render('error', {message : error});

    });
})

module.exports = router; 