const  Produit = require('../Model/produit');

async function add(req, res, next) {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(200).send('add produit success');
  } catch (err) {
    console.log(err);
  }
}
async  function afficher(req, res, next) {
    try {
        const produit = await Produit.find();
        res.status(200).json(produit);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération des produits');

}
}

async function afficherid(req, res, next) {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) {
            return res.status(404).send('produit non trouvé');
        }
        res.status(200).json(produit);
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la récupération de produit');
    }
}
async  function modifier(req, res, next) {
    try {
        const produit = await Produit.findByIdAndUpdate
        (req.params.id, req.body, {new: true});
        if (!produit) {
            return res.status(404).send('produit non trouvé');
        }
        res.status(200).json(produit);
    } catch (e) {
           console.log(err);
    }
}

async function supprimer(req, res, next) {
    try {
        const produit = await Produit.findByIdAndDelete(req.params.id);
        if (!produit) {
            return res.status(404).send('produit non trouvé');
        }
        res.status(200).send('produit supprimé avec succès');
    } catch (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la suppression de produit');
    }
}


module.exports = {add,afficher,afficherid,modifier,supprimer}