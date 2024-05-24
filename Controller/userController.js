const User = require("../Model/user");

exports.allAccess = async (req, res) => {
  try {
    res.status(200).send("Public Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.acheteurBoard = async (req, res) => {
  try {
    res.status(200).send("Acheteur Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.adminBoard = async (req, res) => {
  try {
    res.status(200).send("Admin Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.vendeurBoard = async (req, res) => {
  try {
    res.status(200).send("Vendeur Content.");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
