const express = require('express');
const router = express.Router();

//Model
const MovieSchema = require('../../model/Movie');

//movieRedirect
const movieRedirect = require('./movieRedirect');

//movie add and delete
router.post('/:id', (request, response, next) => {

    //DELETE
    if(request.query.method == 'delete' ){ 
        const promise = MovieSchema.findOneAndRemove({_id : request.params.id});

        promise.then((data) => {
            const notificationText = `${data.movieName} Silme Başarılı`;
            movieRedirect(response, '/movie', notificationText);

        }).catch((error) => {
            response.render('error', {message:error});

        });
    //ADD
    } else { 
        const movieSchema = new MovieSchema(request.body);
        const promise = movieSchema.save();

        promise.then((data) => {
            const notificationText = `${request.body.movieName} Kayıt Başarılı`;
            movieRedirect(response, '/movie', notificationText);

        }).catch((error) => {
            const getErrMsg = () => {
                return new Promise((resolve, reject) => {
                    let errMsg =  error.errors;
                    let topErrMsg = [];

                    for(key in errMsg) {
                        topErrMsg.push(errMsg[key].message);
                    }

                    resolve(topErrMsg);
                }) 
            };

            getErrMsg()
                .then((topErrMsg) => {
                    return topErrMsg;
                }).then((topErrMsg) => {
                    movieRedirect(response, '/movie/movieAdd', topErrMsg);
                }).catch((error) => {
                    console.log(error);
                });
            
            
        });
    };
});

module.exports = router;