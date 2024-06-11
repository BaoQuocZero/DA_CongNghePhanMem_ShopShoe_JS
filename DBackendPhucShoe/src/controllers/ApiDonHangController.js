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
  try {
    const results = await getDonHangChuaGiao();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};
const getDonHangChuaduocGiaochokhachhang = async (req, res) => {
  try {
    const taikhoan = req.body.taikhoan;
    const results = await getDonHangChuaGiaoKhachhang(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};
const getDonHangDaDuocGiao = async (req, res) => {
  try {
    const results = await getDonHangDaGiao();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};
const getDonHangDaduocGiaochokhachhang = async (req, res) => {
  try {
    const taikhoan = req.body.taikhoan;
    const results = await getDonHangDaGiaoKhachhang(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};

const getDonHangDaHuy = async (req, res) => {
  try {
    const results = await getDonHangHuy();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};

const getDonHangDahuyGiaochokhachhang = async (req, res) => {
  try {
    const taikhoan = req.body.taikhoan;
    const results = await getDonHangDaHuyKhachhang(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateTrangthai = async (req, res) => {
  try {
    const madonhang = req.params.madonhang;
    const results = await updateStatus(madonhang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateTrangthaihuydon = async (req, res) => {
  try {
    const madonhang = req.params.madonhang;
    const results = await updateStatusHuydon(madonhang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
};

const XoaDonHangHuy = async (req, res) => {
  try {
    const madonhang = req.query.madonhang;
    const results = await DeleteDonhangHuy(madonhang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error);
  }
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
