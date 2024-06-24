
const filter = require('./filterBadWords');
function validateReclamation(req, res, next) {

 var date =  req.body.date;
  const description = req.body.description;
  const idUtilisateur = req.body.idUtilisateur;
  const nbreCommande = req.body.nbreCommande;
    const titre = req.body.titre;
    const  status = req.body.status;



  if (! status ||!date || !description || !idUtilisateur || !nbreCommande||!titre) {




    return res.status(400).send('Tous les champs sont requis. ');
  }

    const cleanedTitre = filter.clean(titre);
    const cleanedDescription = filter.clean(description);
    if (titre !== cleanedTitre ) {
        return res.status(400).send('Votre titre contient des mots inappropriés.');
    }
    if ( description !== cleanedDescription) {
        return res.status(400).send('Votre  description contient des mots inappropriés.');
    }
  next();
}
function validateReclamationmodification(req, res, next) {


    const description = req.body.description;


    const titre = req.body.titre;



    if (!description ||!titre) {




        return res.status(400).send('Tous les champs sont requis. ');
    }

    const cleanedTitre = filter.clean(titre);
    const cleanedDescription = filter.clean(description);
    if (titre !== cleanedTitre ) {
        return res.status(400).send('Votre titre contient des mots inappropriés.');
    }
    if ( description !== cleanedDescription) {
        return res.status(400).send('Votre  description contient des mots inappropriés.');
    }
    next();
}
function validateSale(req, res, next) {
  const { productId, userId, quantity } = req.body;

  if (!productId || !userId || !quantity) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  next();
}

function validateProduct(req, res, next) {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  next();
}

function validateDiscount(req, res, next) {
  const { productId, userId, percentage, description } = req.body;

  if (!productId || !userId || !percentage || !description) {
    return res.status(400).send('Tous les champs sont requis.');
  }

  next();
}

module.exports = { validateReclamation, validateSale, validateProduct, validateDiscount,validateReclamationmodification };
