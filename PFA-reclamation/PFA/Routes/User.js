// user.js

const express = require("express");
const router = express.Router();
const userController = require("../Controller/User.js");
const { validateUser } = require("../middleware/validationMiddleware");

router.post('/add', validateUser, userController.addUser);
router.get('/afficher', userController.getUsers);
router.get('/aff/:id', userController.getUserById);
router.put('/modifier/:id', validateUser, userController.updateUser);
router.delete('/supprimer/:id', userController.deleteUser);

module.exports = router;
