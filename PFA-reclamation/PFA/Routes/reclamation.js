const express = require("express");
const router = express.Router();
const reclamation = require("../Controller/Reclamation");
const { validateReclamation,validateReclamationmodification } = require("../middleware/validationMiddleware");
const User = require("../Model/User");

// Add user route
router.post('/user/add', async (req, res) => {
  try {
    const { idUtilisateur, name, email } = req.body;
    if (!idUtilisateur || !name || !email) {
      return res.status(400).send('Tous les champs sont requis pour ajouter un utilisateur.');
    }

    const user = new User({ idUtilisateur, name, email });
    await user.save();
    res.status(200).send('Utilisateur ajouté avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur:', err);
    res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur.');
  }
});

router.post('/add', validateReclamation, reclamation.add);
router.get('/afficher', reclamation.afficher);
router.get('/afficherparutilisateur/:id', reclamation.afficherparutilisateur);
router.get('/aff/:id', reclamation.afficherid);
router.patch('/modifier/:id', validateReclamationmodification,reclamation.modifier);
router.patch('/modifierstatus/:id', reclamation.changerStatus);
router.patch('/refuserreclamation/:id/:iduser', reclamation.refuserreclamation);
router.delete('/supprimer/:id', reclamation.supprimer);
router.get('/search', reclamation.searchByKeyword);
router.get('/groupbystatus', reclamation.piechartCountReclamationByStatus);
router.get('/groupbyuser', reclamation.usermostreclamation);
router.get('/reclamationsByMonth', reclamation.reclamationsByMonth);
router.get('/reclamationsCountToday', reclamation.reclamationsCountToday);
router.get('/reclamationsExceeding3DaysPending', reclamation.reclamationsExceeding3DaysPending);
module.exports = router;