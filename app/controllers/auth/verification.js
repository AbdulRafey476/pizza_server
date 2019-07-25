const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;
const mail = require("../../mail/email");
const { token } = require("../../utils");
const _ = require("lodash");

const verification = async (req, res) => {
  const { uid, token } = req.params;

  if (!ObjectId.isValid(uid))
    return res.status(400).send("Invalid token or expired");

  let user = await User.findById(uid).select("-password");

  if (user.verified)
    return res.status(200).send("You already verified your email");

  if (user.token !== token)
    return res.status(400).send("Invalid token or expired.");

  user.verified = true;
  user.validity = false;

  await user.save();

  res.send("Your email is verified");
};

const resent = async (req, res) => {
  const { email } = req.body;

  let user = await User.findOne({ email }).select("-password");
  if (!user) return res.status(400).send("User not found");

  if (user.verified)
    return res.status(400).send("You already verified your email");

  user.token = token();
  user.validity = true;

  await user.save();

  const link = `${req.protocol}://${req.headers.host}/api/verification/${
    user._id
  }/${user.token}`;

  const mailObj = _.assign({ type: "verification", link }, user);
  await mail(mailObj);

  res.send("A verification email is sent to your email address");
};

exports.verification = verification;
exports.resent = resent;
