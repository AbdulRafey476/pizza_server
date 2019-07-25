const db = require("../database");
const jwt = require("jsonwebtoken");

const userSchema = new db.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: { type: String, default: "costumer" },
  verified: { type: Boolean, default: false },
  token: { type: String, required: true },
  validity: { type: Boolean, required: true }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, "node_nosql_apis_jwt_private_key", {
    expiresIn: "1d"
  });
  return token;
};

const User = db.model("User", userSchema);

exports.User = User;
