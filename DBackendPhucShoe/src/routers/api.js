const express = require("express");
const router = express.Router();
const { getAllProduct } = require("../controllers/ApiController");
const {
  CreateUser,
  getAllUser,
  loginUser,
} = require("../controllers/apiUserController");
router.get("/product", getAllProduct);
// router.post("/product", getAllProduct);
router.put("/product/:", getAllProduct);
router.delete("/product", getAllProduct);

//user routes
router.post("/user", CreateUser);
router.get("/user1", getAllUser);
router.post("/loginn", loginUser);
module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
