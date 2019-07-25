const { User } = require("../../models/user");
const ObjectId = require("mongoose").Types.ObjectId;

const me = async (req, res) => {
  if (!ObjectId.isValid(req.user._id))
    return res.status(400).send("Invalid token or expired");

  let user = await User.findById(req.user._id).select(
    "-password -token -validity -role -verified"
  );
  res.send(user);
};

module.exports = me;
