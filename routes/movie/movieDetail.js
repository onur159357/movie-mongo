const express = require('express');
const router = express.Router();
const url = require('url');

//Model
const MovieSchema = require('../../model/Movie');

//Detail
router.get('/:id', (request, response, next) => {
    const promise = MovieSchema.findById(request.params.id);
    
    promise.then((data) => {
        if(!data){
            next({message : 'Üzgünüz Böyle Bir Sayfa Yok'});
        } else {
            response.render('movieDetail', {detail: data, text : request.query.valid});
        }
    }).catch((error) => {
        response.render('error', {message: 'laiklik elden gidei'});

    });
})

module.exports = router;