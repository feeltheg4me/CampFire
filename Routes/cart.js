const express =require("express");
const router = express.Router();
const cart = require ("../Controller/cart.js")

//crud ajout
router.post('/add',cart.add);
router.get('/afficher',cart.afficher);
//crud afficher by id
router.get('/aff/:id',cart.afficherid);
//crud update
router.put('/modifier/:id',cart.modifier);
//crud delete
router.delete('/supprimer/:id',cart.supprimer);

module.exports=router;