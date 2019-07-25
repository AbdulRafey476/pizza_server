const db = require("../database");
require("mongoose-type-url");

const pizzaSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true
  },

  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  category: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  image: {
    type: db.SchemaTypes.Url,
    required: true,
    minlength: 5,
    maxlength: 255
  },

  type: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  size: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },

  price: {
    type: Number,
    required: true,
    maxlength: 50
  }
});

const Pizza = db.model("Pizza", pizzaSchema);

exports.Pizza = Pizza;
