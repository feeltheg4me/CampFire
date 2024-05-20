const express = require('express');
const router = express.Router();
const produit = require('../Controller/ProduitController');

//crud ajout
router.post('/add', produit.add);
//crud afficher
router.get('/afficher', produit.afficher);
//crud afficher by id
router.get('/aff/:id', produit.afficherid);
//crud update
router.put('/modifier/:id', produit.modifier);
//crud delete
router.delete('/supprimer/:id', produit.supprimer);

module.exports = router;