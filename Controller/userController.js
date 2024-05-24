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

// Mettre à jour le profil de l'utilisateur
exports.updateProfile = async (req, res) => {
  try {
    const userIdToUpdate = req.params.userId; // Get the user ID from the URL parameters

    // Check if the user exists
    const userToUpdate = await User.findById(userIdToUpdate);
    if (!userToUpdate) {
      return res.status(404).send({ message: "User not found." });
    }

    // Extract profile data from the request body
    const { fullName, bio, profilePicture } = req.body;

    // Update user profile in the database
    userToUpdate.fullName = fullName;
    userToUpdate.bio = bio;
    userToUpdate.profilePicture = profilePicture;
    await userToUpdate.save();

    res.status(200).send({ message: "User profile updated successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Suivre un autre utilisateur
exports.followUser = async (req, res) => {
  try {
    const userId = req.userId;
    const { userIdToFollow } = req.body;

    // Check if both the user and the user to follow exist
    const user = await User.findById(userId);
    const userToFollow = await User.findById(userIdToFollow);
    if (!user || !userToFollow) {
      return res.status(404).send({ message: "User(s) not found." });
    }

    // Add userIdToFollow to the following list of the current user
    user.following.push(userIdToFollow);
    await user.save();

    res.status(200).send({ message: "User followed successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};