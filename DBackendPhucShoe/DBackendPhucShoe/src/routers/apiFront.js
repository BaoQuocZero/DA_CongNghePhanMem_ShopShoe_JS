// routes/api.js
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/ApiController");

router.post("/product", homeController.getProduct);

module.exports = router;
