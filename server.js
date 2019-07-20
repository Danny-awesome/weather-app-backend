const winston = require('winston');
const express = require('express');
const app = express();

const error = require('./error');
const weather_info = require('./city');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/city', weather_info)
// app.use(error);

require('./startup/db_connect_config')();
require('./startup/logging')();

const port = process.env.PORT || 3000;
const server = app.listen(port, (err) => {
    const app_startup_logger = winston.createLogger({
        transports: [ new winston.transports.Console() ]
    });
    if (err) throw err;
    app_startup_logger.log('info', `server started on ${port}`);
});


module.exports = server;