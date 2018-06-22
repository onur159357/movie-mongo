const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect ('mongodb://localhost/testDb');
    mongoose.connection.on('open', ()=> {
        console.log('connectionDb');
    });

    mongoose.connection.on('error', (error) => {
        console.log(error);
    });

    mongoose.Promise = global.Promise;
};