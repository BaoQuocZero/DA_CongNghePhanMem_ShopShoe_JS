const connection = require("../config/old.js");
const {
  getDonHangChuaGiao,
  getDonHangDaGiao,
  updateStatus,
  getDonHangHuy,
  updateStatusHuydon,
  DeleteDonhangHuy,
} = require("../services/apiDONHANGService.js");

const getDonHangChuaduocGiao = async (req, res) => {
  const results = await getDonHangChuaGiao();
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

const getDonHangDaHuy = async (req, res) => {
  const results = await getDonHangHuy();
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
};
