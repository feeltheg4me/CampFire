const express =require("express");
const router = express.Router();
const ticket = require ("../Controller/ticket")


//crud ajout
router.post('/add',ticket.add);
//crud afficher
router.get('/afficher',ticket.afficher);
//crud afficher by id


module.exports=router;