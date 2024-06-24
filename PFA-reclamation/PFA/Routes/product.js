const express = require("express");
const router = express.Router();
const productController = require("../Controller/Product");
const { validateProduct } = require("../middleware/validationMiddleware");

router.post('/add', validateProduct, productController.addProduct);
router.get('/afficher', productController.getProducts);
router.get('/aff/:id', productController.getProductById);
router.put('/modifier/:id', validateProduct, productController.updateProduct);
router.delete('/supprimer/:id', productController.deleteProduct);

module.exports = router;
