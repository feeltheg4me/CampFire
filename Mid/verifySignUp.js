const db = require("../Model");
const User = db.user;
const Role = db.role;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check Username
    const usernameUser = await User.findOne({ username: req.body.username });
    if (usernameUser) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    // Check Email
    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = async (req, res, next) => {
  try {
    if (req.body.roles) {
      const existingRoles = await Role.find({ name: { $in: req.body.roles } });
      const existingRoleNames = existingRoles.map(role => role.name);

      for (let i = 0; i < req.body.roles.length; i++) {
        if (!existingRoleNames.includes(req.body.roles[i])) {
          return res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
          });
        }
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
