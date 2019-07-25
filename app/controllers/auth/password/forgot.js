const Joi = require("joi");
const _ = require("lodash");
const { User } = require("../../../models/user");
const { token } = require("../../../utils");
const mail = require("../../../mail/email");

const forgot = async (req, res) => {
  const { email } = req.body;

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).send("User does not exist with that email.");

  if (!user.verified)
    return res.status(400).send("Please verify your email address");

  user.token = token();
  user.validity = true;

  await user.save();

  const link = `${req.protocol}://${req.headers.host}/api/password/reset/${
    user._id
  }/${user.token}`;

  const mailObj = _.assign({ type: "reset", link }, user);
  await mail(mailObj);

  res.send("A reset link send to your email address.");
};

const validate = req => {
  const Schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
  };

  return Joi.validate(req, Schema);
};

module.exports = forgot;
