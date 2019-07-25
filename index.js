const express = require("express");
const app = express();
const error = require("./app/middleware/error");
const port = process.env.PORT || 9523

require("dotenv").config();
require("./app/startup/logging")();
require("./app/startup/config")(app);

const api = require("./app/routes/api");
app.use("/api", api);
app.use(error);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
