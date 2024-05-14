const express =require("express");
const router = express.Router();
const evenement = require ("../Controller/user.js")

//crud ajout
router.post('/add',evenement.add);
//crud update
router.put('/modifier/:id',evenement.modifier);
//crud delete
router.delete('/supprimer/:id',evenement.supprimer);
//crud get
router.delete('/get/:id',user.get);
//crud afficher by id
router.get('/aff/:id',user.afficherid);
module.exports=router;