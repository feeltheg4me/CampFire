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

router.get("/test/all", controller.allAccess);

router.get("/test/user", [authJwt.verifyToken], controller.userBoard);


router.get("/test/mod", [authJwt.verifyToken, authJwt.isVendeur],controller.moderatorBoard);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = router;
