const Discount = require("../Model/Discount");
const Product = require("../Model/Product");
const User = require("../Model/User");
const mongoose = require("mongoose");

async function addDiscount(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la remise sont manquantes.');
    }

    const { productId, userId, percentage, description } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Produit non trouvé.');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé.');
    }

    const discount = new Discount({ productId, userId, percentage, description });
    await discount.save();

    res.status(200).send('Remise ajoutée avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la remise:', err);
    res.status(500).send('Erreur lors de l\'ajout de la remise.');
  }
}

async function getDiscounts(req, res, next) {
  try {
    const discounts = await Discount.find().populate('productId').populate('userId');
    res.status(200).json(discounts);
  } catch (err) {
    console.error('Erreur lors de la récupération des remises:', err);
    res.status(500).send('Erreur lors de la récupération des remises.');
  }
}

async function getDiscountById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de remise invalide:', id);
      return res.status(400).send('ID de remise invalide.');
    }

    const discount = await Discount.findById(id).populate('productId').populate('userId');
    if (!discount) {
      return res.status(404).send('Remise non trouvée.');
    }
    res.status(200).json(discount);
  } catch (err) {
    console.error('Erreur lors de la récupération de la remise:', err);
    res.status(500).send('Erreur lors de la récupération de la remise.');
  }
}

async function updateDiscount(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la remise sont manquantes.');
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de remise invalide:', id);
      return res.status(400).send('ID de remise invalide.');
    }

    const discount = await Discount.findByIdAndUpdate(id, req.body, { new: true });
    if (!discount) {
      return res.status(404).send('Remise non trouvée.');
    }
    res.status(200).json(discount);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la remise:', err);
    res.status(500).send('Erreur lors de la mise à jour de la remise.');
  }
}

async function deleteDiscount(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de remise invalide:', id);
      return res.status(400).send('ID de remise invalide.');
    }

    const discount = await Discount.findByIdAndDelete(id);
    if (!discount) {
      return res.status(404).send('Remise non trouvée.');
    }
    res.status(200).send('Remise supprimée avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression de la remise:', err);
    res.status(500).send('Erreur lors de la suppression de la remise.');
  }
}

module.exports = { addDiscount, getDiscounts, getDiscountById, updateDiscount, deleteDiscount };
