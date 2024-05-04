const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");
const {
  CreateUser,
  getAllUser,
  loginUser,
  getInfoUser,
  CapnhatUser,
  CapnhatAvatarUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
} = require("../controllers/apiUserController");
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

//user routes login and register
router.post("/register", CreateUser);
router.post("/login", loginUser);

//admin routers login and register
router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", registerAdmin);

//----------------------------------------------------------------------------------------------------------------
//user routes READ POST PUT DELETE information
router.get("/user", getAllUser); // get list of users
router.get("/user/info/:username", getInfoUser); //get info 1 user
router.put("/user/info/update/:username", CapnhatUser);
router.put(
  "/user/info/update/avatar/:username",
  upload.single("image"),
  CapnhatAvatarUser
);
router.put("/user/info/update/password/:username", CapnhatPasswordUser); //update 1 user (cho người dùng)
router.delete("/user/info/delete/:username", XoaUser); //xóa user (cho admin)

module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
