const express = require('express');
const router = express.Router();
const url = require('url');

//Model
const MovieSchema = require('../../model/Movie');

//redirect movie detail
const movieRedirect = require('./movieRedirect');

//GET UPDATE PAGE
router.get('/movieEdit/:id', (request, response, next) => {
    const promise = MovieSchema.findById(
        request.params.id, 
        request.body,
        {
            new:true,
        }
    );
    
    promise.then((data) => {
        if(data.year === null){
            const date = new Date();
            var newDate = new String();
        }else {
            const date = new Date(data.year);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            const dt = date.getDate();

            var newDate = `${year}-${month}-${dt}`;
        };

        response.render('movieEdit', {detail : data, newDate : newDate,});

    }).catch((error) => {
        response.render('error', {message: error.message});

    });
});
//POST UPDATE
router.post('/movieEdit/:id', (request, response, next) => {
    const promise = MovieSchema.findByIdAndUpdate(
        request.params.id, 
        request.body,
        {
            new : true,
        }
    );

    promise.then((data) => {
        movieRedirect(response, `/movie/${data._id}`, `${data.movieName} deki değişiklik başarılı`);

    }).catch((error) => {
        response.render('error', {message : error.message});

    })
})

module.exports = router;