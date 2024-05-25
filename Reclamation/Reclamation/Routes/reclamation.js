const express = require("express");
const router = express.Router();
const reclamation = require("../Controller/Reclamation");
const { validateReclamation } = require("../middleware/validationMiddleware");
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
router.get('/aff/:id', reclamation.afficherid);
router.put('/modifier/:id', validateReclamation, reclamation.modifier);
router.delete('/supprimer/:id', reclamation.supprimer);

module.exports = router;