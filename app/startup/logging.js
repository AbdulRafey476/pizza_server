require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

const logging = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandleRejection", ex => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: "logfile.log" }));

  winston.add(
    new winston.transports.MongoDB({
      db: `mongodb://admin:admin123@ds345587.mlab.com:45587/node_nosql_apis`,
      level: "info"
    })
  );
};

module.exports = logging;
