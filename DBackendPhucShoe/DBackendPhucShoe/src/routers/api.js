const express = require("express");
const router = express.Router();

const {
  CreateUser,
  getAllUser,
  loginUser,
  getInfoUser,
  CapnhatUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
} = require("../controllers/apiUserController");

//user routes login and register
router.post("/register", CreateUser);
// router.get("/user", getAllUser);
router.post("/login", loginUser);

//admin routers login and register
router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", registerAdmin);

//----------------------------------------------------------------------------------------------------------------
//user routes READ POST PUT DELETE information
router.get("/user", getAllUser); // get list of users
router.get("/user/info/:username", getInfoUser); //get info 1 user
router.put("/user/info/update/:username", CapnhatUser);
router.put("/user/info/update/password/:username", CapnhatPasswordUser); //update 1 user (cho người dùng)
router.delete("/user/info/delete/:username", XoaUser); //xóa user (cho admin)

module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
