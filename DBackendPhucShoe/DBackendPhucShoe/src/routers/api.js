const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");
const fs = require("fs");
// const { getAllProduct } = require("../controllers/ApiController");
const {
  CreateUser,
  getAllUser,
  loginUser,
  logoutUser,
  getInfoUser,
  CapnhatUser,
  CapnhatAvatarUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
} = require("../controllers/apiUserController");

const {
  CapnhatHang,
  XoaHang,
  DanhSachHang,
  TaoHang,
  DanhSachkichco,
  Capnhatkichco,
  Taokichco,
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  DanhSachsanpham,
  DanhSachthongkesanpham,
  Taosanpham,
  Capnhatsanpham,
  Xoasanpham,
} = require("../controllers/ProductApiController");

const { checkUserJWT } = require("../middleware/JWTaction"); //test 1 số route có chứa hàm này
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
router.get("/product", getAllProduct);
// // router.put("/product/:", checkUserJWT, getAllProduct);
// router.delete("/product", checkUserJWT, getAllProduct);

//----------------------------------------------------------------------------------------------------------------
//user routes login and register
router.post("/register", CreateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
//----------------------------------------------------------------------------------------------------------------
//admin routers login and register
router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", registerAdmin);

//----------------------------------------------------------------------------------------------------------------
//user routes READ POST PUT DELETE information
router.get("/user", checkUserJWT, getAllUser); // get list of users
router.get("/user/info/:username", checkUserJWT, getInfoUser); //get info 1 user
router.put("/user/info/update/:username", checkUserJWT, CapnhatUser);
router.put(
  "/user/info/update/avatar/:username",
  checkUserJWT,
  upload.single("image"),
  CapnhatAvatarUser
);
router.put(
  "/user/info/update/password/:username",
  checkUserJWT,
  CapnhatPasswordUser
); //update 1 user (cho người dùng)
router.delete("/user/info/delete/:username", checkUserJWT, XoaUser); //xóa user (cho admin)

//----------------------------------------------------------------------------------------------------------------
//multer config

//----------------------------------------------------------------------------------------------------------------
//api HANG
router.get("/hang", DanhSachHang);
router.post("/hang/create", TaoHang);
router.put("/hang/info/update/:mahang", CapnhatHang);
router.delete("/hang/info/delete/:username", XoaHang); //chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api KICHCO
router.get("/kichco", DanhSachkichco);
router.post("/kichco/create", Taokichco);
router.put("/kichco/info/update/:magiatri", Capnhatkichco);
router.delete("/kichco/info/delete/:username", XoaUser); // chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api MALOAI
router.get("/loai", DanhSachloai); // get list of users
router.post("/loai/create", Taoloai); //get info 1 user
router.put("/loai/info/update/:maloai", Capnhatloai);
router.delete("/loai/info/delete/:username", XoaUser);

//api sản phẩm
router.get("/productall", DanhSachsanpham); // get list of users
router.get("/productThongke", DanhSachthongkesanpham); // get list of users
router.post("/product/create", upload.single("image"), Taosanpham); //get info 1 user
router.put(
  "/product/info/update/:masanpham",
  upload.single("image"),
  Capnhatsanpham
);
router.delete("/product/info/delete/:masanpham", Xoasanpham);

module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
