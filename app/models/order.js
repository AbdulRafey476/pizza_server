const db = require("../database");
require("mongoose-type-url");

const orderSchema = new db.Schema({
  costumer: {
    type: db.Schema.Types.ObjectId,
    ref: "User"
  },
  pizza: {
    type: db.Schema.Types.ObjectId,
    ref: "Pizza"
  },
  quantity: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const Order = db.model("Order", orderSchema);

exports.Order = Order;
