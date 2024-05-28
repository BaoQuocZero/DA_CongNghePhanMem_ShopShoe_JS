const connection = require("../config/old.js");
const {
  getDonHangChuaGiao,
  getDonHangDaGiao,
  updateStatus,
  getDonHangHuy,
  updateStatusHuydon,
  DeleteDonhangHuy,
  getDonHangChuaGiaoKhachhang,
  getDonHangDaGiaoKhachhang,
  getDonHangDaHuyKhachhang,
} = require("../services/apiDONHANGService");

const getDonHangChuaduocGiao = async (req, res) => {
  const results = await getDonHangChuaGiao();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};
const getDonHangChuaduocGiaochokhachhang = async (req, res) => {
  const taikhoan = req.body.taikhoan;
  console.log(taikhoan);
  const results = await getDonHangChuaGiaoKhachhang(taikhoan);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};
const getDonHangDaDuocGiao = async (req, res) => {
  const results = await getDonHangDaGiao();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};
const getDonHangDaduocGiaochokhachhang = async (req, res) => {
  const taikhoan = req.body.taikhoan;
  const results = await getDonHangDaGiaoKhachhang(taikhoan);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const getDonHangDaHuy = async (req, res) => {
  const results = await getDonHangHuy();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const getDonHangDahuyGiaochokhachhang = async (req, res) => {
  const taikhoan = req.body.taikhoan;
  const results = await getDonHangDaHuyKhachhang(taikhoan);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const updateTrangthai = async (req, res) => {
  const madonhang = req.params.madonhang;
  console.log(madonhang);
  const results = await updateStatus(madonhang);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const updateTrangthaihuydon = async (req, res) => {
  const madonhang = req.params.madonhang;
  console.log(madonhang);
  const results = await updateStatusHuydon(madonhang);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const XoaDonHangHuy = async (req, res) => {
  const madonhang = req.query.madonhang;
  console.log(madonhang);
  const results = await DeleteDonhangHuy(madonhang);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

module.exports = {
  getDonHangChuaduocGiao,
  getDonHangDaDuocGiao,
  updateTrangthai,
  XoaDonHangHuy,
  updateTrangthaihuydon,
  getDonHangDaHuy,
  getDonHangChuaduocGiaochokhachhang,
  getDonHangDaduocGiaochokhachhang,
  getDonHangDahuyGiaochokhachhang,
};
