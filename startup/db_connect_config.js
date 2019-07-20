const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = function () {
    const db_startup_logger = winston.createLogger({
        transports: [ new winston.transports.Console()]
    });
    const db = config.get('db');
    mongoose.connect( db, { useNewUrlParser: true })
        .then( ()=> db_startup_logger.log('info', `Connected successfully to ${db}`));

    mongoose.set('useCreateIndex', true);
}