const express =require("express");
const router = express.Router();
const user = require ("../Controller/userController.js")

//crud ajout
router.post('/add',user.add);
//crud update
router.put('/modifier/:id',user.modifier);
//crud delete
router.delete('/supprimer/:id',user.supprimer);
// //crud get
// router.get('/get/:id',user.get);
//crud afficher by id
router.get('/aff/:id',user.afficherid);
module.exports=router;