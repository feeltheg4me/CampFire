const Product = require("../Model/Product");

async function addProduct(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données du produit sont manquantes.');
    }

    const { name, price, date } = req.body;
    const product = new Product({ name, price, date });
    await product.save();

    res.status(200).send('Produit ajouté avec succès.');
  } catch (err) {
    console.error('Erreur lors de l\'ajout du produit:', err);
    res.status(500).send('Erreur lors de l\'ajout du produit.');
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Erreur lors de la récupération des produits:', err);
    res.status(500).send('Erreur lors de la récupération des produits.');
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de produit invalide:', id);
      return res.status(400).send('ID de produit invalide.');
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Produit non trouvé.');
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Erreur lors de la récupération du produit:', err);
    res.status(500).send('Erreur lors de la récupération du produit.');
  }
}

async function updateProduct(req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send('Les données du produit sont manquantes.');
    }

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de produit invalide:', id);
      return res.status(400).send('ID de produit invalide.');
    }

    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) {
      return res.status(404).send('Produit non trouvé.');
    }
    res.status(200).json(product);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du produit:', err);
    res.status(500).send('Erreur lors de la mise à jour du produit.');
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error('ID de produit invalide:', id);
      return res.status(400).send('ID de produit invalide.');
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send('Produit non trouvé.');
    }
    res.status(200).send('Produit supprimé avec succès.');
  } catch (err) {
    console.error('Erreur lors de la suppression du produit:', err);
    res.status(500).send('Erreur lors de la suppression du produit.');
  }
}

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct };
