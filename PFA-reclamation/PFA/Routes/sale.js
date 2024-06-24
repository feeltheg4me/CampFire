const express = require("express");
const router = express.Router();
const saleController = require("../Controller/Sale.js");
const { validateSale } = require("../middleware/validationMiddleware");

router.post('/add', validateSale, saleController.addSale);
router.get('/afficher', saleController.getSales);
router.get('/aff/:id', saleController.getSaleById);
router.put('/modifier/:id', validateSale, saleController.updateSale);
router.delete('/supprimer/:id', saleController.deleteSale);

module.exports = router;
