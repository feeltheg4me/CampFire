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
router.post('/generateimage',annonceOffre.generateImage);
router.get('/getproduct/:id',annonceOffre.getProduitByAnnounce);
router.put('/incrementviews/:id',annonceOffre.incrementumberOfViews);
router.put('/incrementlikes/:id',annonceOffre.incrementumberOfLikes);
router.put('/decrementlikes/:id',annonceOffre.decrementumberOfLikes);
router.put('/updatestatus/:id',annonceOffre.updateStatus);
router.put('/updateimage/:id',annonceOffre.updateAnounceImage);

module.exports=router;