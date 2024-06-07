var Cart = require("../Model/cart")


async function add(req, res, next) {
  try{
  const cart= new Cart(req.body);
  await cart.save();
  res.status(200).send('add cart success');
    }catch(err){
  console.log(err);
    }
  
  }
  async function afficher(req, res, next) {
    try {
      const cart = await Cart.find();
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération des cart');
    }
  }

  async function afficherid(req, res, next) {
    try {
      const cart = await Cart.findById(req.params.id);
      if (!cart) {
        return res.status(404).send('cart non trouvé');
      }
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la récupération de cart');
    }
  }

  

  async function modifier(req, res, next) {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!cart) {
        return res.status(404).send('cart non trouvé');
      }
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la mise à jour de l\'cart');
    }
  }

  async function supprimer(req, res, next) {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.id);
      if (!cart) {
        return res.status(404).send('cart non trouvé');
      }
      res.status(200).send('cart supprimé avec succès');
    } catch (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de cart');
    }
  }

  module.exports = {add,afficher,afficherid,modifier,supprimer}