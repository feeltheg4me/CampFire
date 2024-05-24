const express = require("express");
const router = express.Router();
const { authJwt } = require("../Mid");
const controller = require("../Controller/userController.js");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/api/test/all", controller.allAccess);

router.get("/api/test/acheteur", [authJwt.verifyToken, authJwt.isAcheteur], controller.acheteurBoard);

router.get("/api/test/vendeur", [authJwt.verifyToken, authJwt.isVendeur],controller.vendeurBoard);

router.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);

router.put("/api/user/:userId/updateprofile", [authJwt.verifyToken], controller.updateProfile);

router.post("/api/user/follow", [authJwt.verifyToken], controller.followUser);

module.exports = router;
