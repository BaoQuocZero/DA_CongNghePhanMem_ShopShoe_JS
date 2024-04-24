const express = require("express");
const router = express.Router();

const {
  CreateUser,
  getAllUser,
  loginUser,
} = require("../controllers/apiUserController");

//user routes
router.post("/register", CreateUser);
router.get("/user", getAllUser);
router.post("/login", loginUser);
module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
