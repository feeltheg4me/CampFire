const Reclamation = require("../Model/Reclamation");
const User = require("../Model/User");
const mongoose = require("mongoose");

async function add(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la réclamation sont manquantes.');
    }

    const reclamation = new Reclamation(req.body);
    await reclamation.save();

    // Count the number of reclamations for the user
    const reclamationCount = await Reclamation.countDocuments({ idUtilisateur: req.body.idUtilisateur });

    // If the user has 3 reclamations, delete the user and their reclamations
    if (reclamationCount >= 3) {
      await User.findByIdAndDelete(req.body.idUtilisateur);
      await Reclamation.deleteMany({ idUtilisateur: req.body.idUtilisateur });
      return res.status(200).send('L\'utilisateur a été supprimé après avoir atteint 3 réclamations.');
    }

    res.status(200).send('La réclamation a été ajoutée avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la réclamation:', err);
    res.status(500).send('Erreur lors de l\'ajout de la réclamation.');
  }
}


async function afficher(req, res, next) {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (err) {
    console.error('Erreur lors de la récupération des réclamations:', err);
    res.status(500).send('Erreur lors de la récupération des réclamations.');
  }
}

async function afficherid(req, res, next) {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findById(id);
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).json(reclamation);
  } catch (err) {
    console.error('Erreur lors de la récupération de la réclamation:', err);
    res.status(500).send('Erreur lors de la récupération de la réclamation.');
  }
}

async function modifier(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la réclamation sont manquantes.');
    }

    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findByIdAndUpdate(id, req.body, { new: true });
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).json(reclamation);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la réclamation:', err);
    res.status(500).send('Erreur lors de la mise à jour de la réclamation.');
  }
}

async function supprimer(req, res, next) {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de réclamation invalide:', id);
      return res.status(400).send('ID de réclamation invalide.');
    }

    const reclamation = await Reclamation.findByIdAndDelete(id);
    if (!reclamation) {
      return res.status(404).send('Réclamation non trouvée.');
    }
    res.status(200).send('Réclamation supprimée avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression de la réclamation:', err);
    res.status(500).send('Erreur lors de la suppression de la réclamation.');
  }
}

module.exports = { add, afficher, afficherid, modifier, supprimer };
