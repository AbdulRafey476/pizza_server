const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");

const prod = app => {
  app.use(cors());
  app.use(helmet());

  app.use(compression());

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

module.exports = prod;
