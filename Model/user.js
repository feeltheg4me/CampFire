const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    fullName: String, // Nouveau champ pour le nom complet de l'utilisateur
    bio: String, // Nouveau champ pour la biographie de l'utilisateur
    profilePicture: String, // Nouveau champ pour l'URL de la photo de profil de l'utilisateur
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Champ pour stocker les utilisateurs suivis
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;