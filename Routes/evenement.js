const express = require("express");
const router = express.Router();
const evenement = require("../Controller/evenement.js");
const validate = require("../Mid/validate.js");

// CRUD ajouter
router.post('/add', validate, evenement.add);
// CRUD afficher
router.get('/afficher', evenement.afficher);
// CRUD afficher par ID
router.get('/aff/:id', evenement.afficherid);
// CRUD modifier
router.put('/modifier/:id', validate, evenement.modifier);
// CRUD supprimer
router.delete('/supprimer/:id', evenement.supprimer);

// Mettre à jour les coordonnées GPS
router.put('/coordinates/:id', evenement.updateCoordinates);
// Rechercher des événements proches
router.get('/nearby', evenement.findNearbyEvents);

module.exports = router;
