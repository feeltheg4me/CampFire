const express =require("express");
const router = express.Router();
const annonceOffre = require ("../Controller/AnnonceOffre.js")

//crud ajout
router.post('/add',annonceOffre.add);
//crud afficher
router.get('/afficher',annonceOffre.afficher);
//crud afficher by id
router.get('/aff/:id',annonceOffre.afficherid);
//crud update
router.put('/modifier/:id',annonceOffre.modifier);
//crud delete
router.delete('/supprimer/:id',annonceOffre.supprimer);

module.exports=router;