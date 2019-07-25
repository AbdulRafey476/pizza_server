const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const reset = async (req, res) => {
  const { uid, token } = req.params;

  const { password } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (!ObjectId.isValid(uid))
    return res.status(400).send("Invalid token or expired");

  const user = await User.findById(uid).select("-password");
  if (!user.validity) return res.status(400).send("Invalid token or expired.");

  if (user.token !== token)
    return res.status(400).send("Invalid token or expired.");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  user.validity = false;

  await user.save();

  res.send("Successfully reset the password");
};

const validate = req => {
  const Schema = {
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    password_confirmation: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } })
  };

  return Joi.validate(req, Schema);
};

module.exports = reset;
