var AnnonceOffre = require("../Model/annonceOffre")


async function add(req, res, next) {
  try{
  const annonceOffre= new AnnonceOffre(req.body);
  await annonceOffre.save();
  res.status(200).send('add annonceOffre sucess');
    }catch(err){
  console.log(err);
    }
  
  }
  async function afficher(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.find();
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des annonceOffre');
    }
  }

  async function afficherid(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findById(req.params.id);
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de annonceOffre');
    }
  }

  

  async function modifier(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).json(annonceOffre);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'annonceOffre');
    }
  }

  async function supprimer(req, res, next) {
    try {
      const annonceOffre = await AnnonceOffre.findByIdAndDelete(req.params.id);
      if (!annonceOffre) {
        return res.status(404).send('annonceOffre non trouvé');
      }
      res.status(200).send('annonceOffre supprimé avec succès');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de annonceOffre');
    }
  }

  module.exports = {add,afficher,afficherid,modifier,supprimer}