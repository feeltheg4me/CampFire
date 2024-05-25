function validateReclamation(req, res, next) {
  const { idReclamation, date, description, idUtilisateur, nbreCommande } = req.body;

  if (!idReclamation || !date || !description || !idUtilisateur || !nbreCommande) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  next();
}

module.exports = { validateReclamation };
