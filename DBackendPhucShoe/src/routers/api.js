const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
var appRoot = require("app-root-path");
const fs = require("fs");
const { getAllProduct } = require("../controllers/ApiController");
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
  muahangUser,
  CapnhatAdmin,
  countUsers,
} = require("../controllers/apiUserController");
const {
  getDonHangChuaduocGiao,
  getDonHangDaDuocGiao,
  updateTrangthai,
  XoaDonHangHuy,
  updateTrangthaihuydon,
  getDonHangDaHuy,
  getDonHangChuaduocGiaochokhachhang,
  getDonHangDaduocGiaochokhachhang,
  getDonHangDahuyGiaochokhachhang,
} = require("../controllers/ApiDonHangController");
const {
  CapnhatHang,
  XoaHang,
  DanhSachHang,
  TaoHang,
  DanhSachkichco,
  Capnhatkichco,
  Taokichco,
  XoaKichco,
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  XoaLoai,
  DanhSachsanpham,
  DanhSachthongkesanphamvoiHang,
  DanhSachthongkesanphamvoiLoai,
  DanhSachthongkesanphamvoiThang,
  DanhSachthongkesanphamvoiNam,
  DanhSachsanphamwithPaginate,
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
// router.get("/product", getAllProduct);
// // router.post("/product", getAllProduct);
// router.put("/product/:", checkUserJWT, getAllProduct);
// router.delete("/product", checkUserJWT, getAllProduct);

//mua hàng dành cho user
router.post("/productt", muahangUser);
//----------------------------------------------------------------------------------------------------------------
//user routes login and register
router.get("/protected", checkUserJWT, (req, res) => {
  res.json({ message: "Protected data", user: req.user }); // Sử dụng thông tin người dùng từ req.user
});
router.post("/register", CreateUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
//----------------------------------------------------------------------------------------------------------------
//admin routers login and register
router.post("/loginAdmin", loginAdmin);
router.post("/registerAdmin", registerAdmin);
router.put("/admin/info/update/password/", checkUserJWT, CapnhatAdmin); //update mật khẩu cho admin
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
router.delete("/hang/info/delete", XoaHang); //chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api KICHCO
router.get("/kichco", DanhSachkichco);
router.post("/kichco/create", Taokichco);
router.put("/kichco/info/update/:magiatri", Capnhatkichco);
router.delete("/kichco/info/delete", XoaKichco); // chưa làm được =))))

//----------------------------------------------------------------------------------------------------------------
//api MALOAI
router.get("/loai", DanhSachloai); // get list of users
router.post("/loai/create", Taoloai); //get info 1 user
router.put("/loai/info/update/:maloai", Capnhatloai);
router.delete("/loai/info/delete", XoaLoai);

//api sản phẩm
router.get("/productall", DanhSachsanpham); // get list of users
router.get("/productall/hang", DanhSachthongkesanphamvoiHang); //thống kê đơn hàng HANG các thư cho ADMIN
router.get("/productall/loai", DanhSachthongkesanphamvoiLoai); //thống kê đơn hàng LOAI các thư cho ADMIN
router.get("/productall/nam", DanhSachthongkesanphamvoiNam); //thống kê đơn hàng theo năm các thư cho ADMIN
router.post("/productall/thang", DanhSachthongkesanphamvoiThang); //thống kê đơn hàng THEO THÁNG các thư cho ADMIN
router.get("/productallPaginate", DanhSachsanphamwithPaginate);

router.get("/countuser", countUsers); //Tính số lượng tài khoản đã tạo cho ADMIN
router.get("/productThongke", DanhSachthongkesanpham); //thống kê đơn hàng các thư cho ADMIN
router.post("/product/create", upload.single("image"), Taosanpham); //get info 1 user
router.put(
  "/product/info/update/:masanpham",
  upload.single("image"),
  Capnhatsanpham
);
router.delete("/product/info/delete/:masanpham", Xoasanpham);

//api đơn hàng
router.get("/donhangchuagiao", checkUserJWT, getDonHangChuaduocGiao); // lấy đơn hàng chưa giao

router.get("/donhangdagiao", getDonHangDaDuocGiao); //lấy đơn hàng đã giao thành công
router.put("/donhang/update/:madonhang", updateTrangthai); //update trạng thái của đơn hang
router.get("/donhangdahuy", getDonHangDaHuy); //lấy đơn hàng đã Hủy
router.put("/donhanghuy/update/:madonhang", updateTrangthaihuydon); // update trạng thái đơn hàng thành ĐÃ HỦY
router.delete("/donhanghuy/info/delete", XoaDonHangHuy); // XÓA CÁC ĐƠN HÀNG ĐÃ HỦY

//api đơn hàng cho user
router.post("/donhangchuagiaokhachhang", getDonHangChuaduocGiaochokhachhang);
router.post("/donhangdagiaokhachhang", getDonHangDaduocGiaochokhachhang);
router.post("/donhangdahuygiaokhachhang", getDonHangDahuyGiaochokhachhang);
module.exports = router; // Di chuyển dòng này về cuối tệp của bạn
