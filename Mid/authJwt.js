const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../Model");
const User = db.user;
const Role = db.role;

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized!",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    if (roles.some(role => role.name === "admin")) {
      return next();
    }

    res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isAcheteur = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    if (roles.some(role => role.name === "acheteur")) {
      return next();
    }

    res.status(403).send({ message: "Require Acheteur Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const isVendeur = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    if (roles.some(role => role.name === "vendeur")) {
      return next();
    }

    res.status(403).send({ message: "Require Vendeur Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isAcheteur,
  isVendeur,
};

module.exports = authJwt;
