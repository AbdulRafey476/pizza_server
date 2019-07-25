const mongoose = require("mongoose");

mongoose.connect(
    `mongodb://admin:admin123@ds345587.mlab.com:45587/node_nosql_apis`,
    { useNewUrlParser: true },
    err => {
        if (err) console.log(err);
        console.log("Successfully connected to Database");
    }
);

module.exports = mongoose
