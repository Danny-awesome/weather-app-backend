require("express-async-errors");
const winston = require("winston");

module.exports = function() {
  winston.exceptions.handle( new winston.transports.File({ filename: "uncaughtExceptions.log" }) );
  process.on("unhandledRejection", ex => { throw ex; });
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
}