const Sale = require("../Model/Sale");
const Product = require("../Model/Product");
const mongoose = require("mongoose");
const moment = require("moment");

async function addSale(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la vente sont manquantes.');
    }

    const { productId, quantity, date } = req.body;
    const sale = new Sale({ productId, quantity, date });
    await sale.save();

    // Check if the sale quantity is less than 3 for the product in the last month
    const lastMonthStart = moment().subtract(1, 'months').startOf('month').toDate();
    const lastMonthEnd = moment().subtract(1, 'months').endOf('month').toDate();
    
    const salesCount = await Sale.countDocuments({
      productId,
      date: { $gte: lastMonthStart, $lte: lastMonthEnd }
    });

    // If sales count is less than 3, add a discount of 20%
    if (salesCount < 3) {
      const product = await Product.findById(productId);
      if (product) {
        // Add a discount of 20%
        product.price *= 0.8; // Apply 20% discount
        await product.save();
      }
    }

    res.status(200).send('Vente ajoutée avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout de la vente:', err);
    res.status(500).send('Erreur lors de l\'ajout de la vente.');
  }
}

async function getSales(req, res, next) {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    console.error('Erreur lors de la récupération des ventes:', err);
    res.status(500).send('Erreur lors de la récupération des ventes.');
  }
}

async function getSaleById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de vente invalide:', id);
      return res.status(400).send('ID de vente invalide.');
    }

    const sale = await Sale.findById(id);
    if (!sale) {
      return res.status(404).send('Vente non trouvée.');
    }
    res.status(200).json(sale);
  } catch (err) {
    console.error('Erreur lors de la récupération de la vente:', err);
    res.status(500).send('Erreur lors de la récupération de la vente.');
  }
}

async function updateSale(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données de la vente sont manquantes.');
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de vente invalide:', id);
      return res.status(400).send('ID de vente invalide.');
    }

    const sale = await Sale.findByIdAndUpdate(id, req.body, { new: true });
    if (!sale) {
      return res.status(404).send('Vente non trouvée.');
    }
    res.status(200).json(sale);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la vente:', err);
    res.status(500).send('Erreur lors de la mise à jour de la vente.');
  }
}

async function deleteSale(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de vente invalide:', id);
      return res.status(400).send('ID de vente invalide.');
    }

    const sale = await Sale.findByIdAndDelete(id);
    if (!sale) {
      return res.status(404).send('Vente non trouvée.');
    }
    res.status(200).send('Vente supprimée avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression de la vente:', err);
    res.status(500).send('Erreur lors de la suppression de la vente.');
  }
}

module.exports = { addSale, getSales, getSaleById, updateSale, deleteSale };
