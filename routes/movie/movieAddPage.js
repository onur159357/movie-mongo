
const express = require('express');
const router = express.Router();
const url = require('url');

//Model
const MovieSchema = require('../../model/Movie');

//movie add page
router.get('/movieAdd', (request, response, next) => {
    response.render('movieAdd', {text : request.query.valid})

});

module.exports = router;