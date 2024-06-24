// User.js

const User = require("../Model/User");
const mongoose = require("mongoose");

async function addUser(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de l\'utilisateur sont manquantes.');
    }

    const { idUtilisateur, name, email } = req.body;
    const user = new User({ idUtilisateur, name, email });
    await user.save();

    res.status(200).send('Utilisateur ajouté avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
    res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur.');
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
    res.status(500).send('Erreur lors de la récupération des utilisateurs.');
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID d\'utilisateur invalide:', id);
      return res.status(400).send('ID d\'utilisateur invalide.');
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', err);
    res.status(500).send('Erreur lors de la récupération de l\'utilisateur.');
  }
}

async function updateUser(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de l\'utilisateur sont manquantes.');
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID d\'utilisateur invalide:', id);
      return res.status(400).send('ID d\'utilisateur invalide.');
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
    res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur.');
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID d\'utilisateur invalide:', id);
      return res.status(400).send('ID d\'utilisateur invalide.');
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }
    res.status(200).send('Utilisateur supprimé avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', err);
    res.status(500).send('Erreur lors de la suppression de l\'utilisateur.');
  }
}

module.exports = { addUser, getUsers, getUserById, updateUser, deleteUser };
