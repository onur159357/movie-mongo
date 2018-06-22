const express = require('express');
const router = express.Router();
const url = require('url');

//Model
const MovieSchema = require('../model/Movie');

//back url
const movieRedirect = (response, newUrl, valid) => {
    response.redirect(url.format({
        pathname : newUrl,
        query: {
            "valid":valid,
         }

    }));
};
// Tarih Kontrolü

const dateControl = (dateText) => {
    var reqE = new RegExp(/^(19[5-9][0-9]|20[0-4][0-9]|2050)[-/](0?[1-9]|1[0-2])[-/](0?[1-9]|[12][0-9]|3[01])$/);

    return reqE.test(dateText);
}

//movie list
router.get('/', (request, response, next) => {
    let promise = MovieSchema.find({});

    promise.then((data) => {
        response.render('movie', {movieList : data, notification : request.query.valid});

    }).catch((error) => {
        response.render('error', {message : error});

    });
})

//movie add page
router.get('/movieAdd', (request, response, next) => {
    response.render('movieAdd', {text : request.query.valid})

});


//Edit page and edit
router.get('/movieEdit/:id', (request, response, next) => {
    const promise = MovieSchema.findById(request.params.id);
    
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
router.post('/movieEdit/:id', (request, response, next) => {
    const promise = MovieSchema.findByIdAndUpdate(request.params.id, request.body);

    promise.then((data) => {

        var test1 = request.body.year;
        console.log('test1 ' + test1)

        if(!dateControl(test1))
            console.log('geçerli bir tarih girin');
        else
            console.log('kayıt yapılır');


        response.render('movieDetail', {detail: data});

    }).catch((error) => {
        response.render('error', {message : error.message});

    })
})
//Detail
router.get('/:id', (request, response, next) => {
    const promise = MovieSchema.findById(request.params.id);
    
    promise.then((data) => {
        response.render('movieDetail', {detail : data});

    }).catch((error) => {
        response.render('error', {message: error.message});

    });
})

module.exports = router;