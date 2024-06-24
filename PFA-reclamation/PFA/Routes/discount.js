const express = require("express");
const router = express.Router();
const discountController = require("../Controller/Discount");
const { validateDiscount } = require("../middleware/validationMiddleware");

router.post('/add', validateDiscount, discountController.addDiscount);
router.get('/afficher', discountController.getDiscounts);
router.get('/aff/:id', discountController.getDiscountById);
router.put('/modifier/:id', validateDiscount, discountController.updateDiscount);
router.delete('/supprimer/:id', discountController.deleteDiscount);

module.exports = router;
