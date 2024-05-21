const Evenement = require("../Model/evenement");

// Ajouter un nouvel événement
async function add(req, res, next) {
  try {
    const evenement = new Evenement(req.body);
    await evenement.save();
    res.status(200).send('Evenement ajouté avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de l\'ajout de l\'événement');
  }
}

// Afficher tous les événements
async function afficher(req, res, next) {
  try {
    const evenements = await Evenement.find();
    res.status(200).json(evenements);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération des événements');
  }
}

// Afficher un événement par ID
async function afficherid(req, res, next) {
  try {
    const evenement = await Evenement.findById(req.params.id);
    if (!evenement) {
      return res.status(404).send('Événement non trouvé');
    }
    res.status(200).json(evenement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la récupération de l\'événement');
  }
}

// Modifier un événement
async function modifier(req, res, next) {
  try {
    const evenement = await Evenement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!evenement) {
      return res.status(404).send('Événement non trouvé');
    }
    res.status(200).json(evenement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour de l\'événement');
  }
}

// Supprimer un événement
async function supprimer(req, res, next) {
  try {
    const evenement = await Evenement.findByIdAndDelete(req.params.id);
    if (!evenement) {
      return res.status(404).send('Événement non trouvé');
    }
    res.status(200).send('Événement supprimé avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la suppression de l\'événement');
  }
}

// Mettre à jour les coordonnées GPS d'un événement
async function updateCoordinates(req, res, next) {
  try {
    const { latitude, longitude } = req.body;
    const evenement = await Evenement.findByIdAndUpdate(req.params.id, { coordinates: { latitude, longitude } }, { new: true });
    if (!evenement) {
      return res.status(404).send('Événement non trouvé');
    }
    res.status(200).json(evenement);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour des coordonnées GPS');
  }
}

// Rechercher des événements proches d'une position
async function findNearbyEvents(req, res, next) {
  try {
    const { latitude, longitude, maxDistance } = req.query;
    const events = await Evenement.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    });
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la recherche des événements proches');
  }
}

module.exports = {
  add,
  afficher,
  afficherid,
  modifier,
  supprimer,
  updateCoordinates,
  findNearbyEvents
}
