const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  DeleteDonHang,
  getDeleteUser,
} = require("../controllers/ApiController");
const {
  getThongkeAll,
  GetAllChiTietDonHangNe,
  GetDaGiaoDonHang,
  getAllChiTietDonHang,
  getAllDonHang,
  getItemUser,
  InfoUser,
  postHomePage,
  getDeleteHangSP,
  getAppcetHangSP,
  getCreateHangSP,
  getHomepagee,
  getABC,
  getUpdateSanpham,
  getCreateLoaiSP,
  getDeleteLoaiSP,
  getAppcetLoaiSP,
  postHandleRemoveSanpham,
  getChonSanPham,
  postDeleteUser,
  getHoangphucdethuong,
  getSameple,
  getUpdatePage,
  postCreateSanpham,
  getCreatePage,
} = require("../controllers/homeControllers");
var appRoot = require("app-root-path");
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

const imagePath = path.join(__dirname, "public", "images");

// Endpoint để lấy ảnh

/////////

// router.get('/api/data', getHomepage)

router.post("/Tim", upload.none(), postHomePage);
router.get("/", getHomepagee);
router.get("/abc", getABC);
router.get("/p", getHoangphucdethuong);
router.get("/dev", getSameple);
// res.send('<h1>Hoang phuc ne </h1>')
router.get("/create", getCreatePage);

router.get("/create-loaisanpham", getCreateLoaiSP);
router.post("/create-loaisanphamfr", getAppcetLoaiSP);
router.post("/delete-loaisanphamfr/:id", getDeleteLoaiSP);

//--------------------------------------------------------------------------------
router.get("/create-hangsanpham", getCreateHangSP);
router.post("/create-hangsanphamfr", getAppcetHangSP);
router.post("/delete-hangsanphamfr/:id", getDeleteHangSP);

router.post("/chon-sanpham/:id", getChonSanPham);
// router.get('/update/:id', getUpdatePage)
router.post("/update-sanpham", upload.single("profile_pic"), getUpdateSanpham);
router.post("/create-Sanpham", upload.single("profile_pic"), postCreateSanpham);
// router.post('/delete-user/:id', postDeleteUser);
router.post("/delete-sanpham/:id", postHandleRemoveSanpham);
//------------------------------------KHACH HANG--------------------------------------------
router.get("/khachhang", InfoUser);
router.post("/xem-sanpham/:id", getItemUser);
router.post("/delete-user/:id", getDeleteUser);
router.get("/All-donhang", getAllDonHang);
router.post("/xem-chiTietdonhang/:id", getAllChiTietDonHang);
router.post("/DeleteDonhang/:id", DeleteDonHang);
router.post("/da-giao-don-hang-thanhcong/:id", GetDaGiaoDonHang);
router.get("/all-chitietdonhang", GetAllChiTietDonHangNe);

router.get("/ThongkeAll", getThongkeAll);
module.exports = router; //express default
