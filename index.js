const express = require("express");
const app = express();
const error = require("./app/middleware/error");

require("dotenv").config();
require("./app/startup/logging")();
require("./app/startup/config")(app);

const api = require("./app/routes/api");
app.use("/api", api);
app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
