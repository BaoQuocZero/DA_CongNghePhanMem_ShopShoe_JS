const { name } = require("ejs");
const connection = require("../config/old.js");
const {
  createHANG,
  updateHANG,
  getHANG,
  deleteHANG,
} = require("../services/apiHANGServices");
const multer = require("multer");
const {
  createKICHCO,
  updateKICHCO,
  getKICHCO,
  deleteKICHCO,
} = require("../services/apiKICHCOServices");
const {
  getLOAI,
  createLOAI,
  updateLOAI,
  deleteLOAI,
} = require("../services/apiLOAIServices");

const {
  getSANPHAM,
  createSANPHAM,
  updateSANPHAM,
  Deletesanpham,
  getTongSoLuongSANPHAM,
  getSANPHAMwthPaginate,
  getSANPHAMWithHang,
  getSANPHAMWithLoai,
  getSANPHAMWithThang,
  getSANPHAMwithYear,
} = require("../services/apiSANPHAMServices");

// -------------------------------------------------------------------------------------------------
//hãng
const TaoHang = async (req, res) => {
  console.log("check ", req.body);
  try {
    const hang = req.body.hang;
    const results = await createHANG(hang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const DanhSachHang = async (req, res) => {
  try {
    const results = await getHANG();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatHang = async (req, res) => {
  try {
    const mahang = req.params.mahang;

    const tenhang = req.body.tenhang;

    const results = await updateHANG(mahang, tenhang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaHang = async (req, res) => {
  try {
    const mahang = req.query.mahang;
    const results = await deleteHANG(mahang);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------------------------------------------------------------------------
//kích cỡ
const Taokichco = async (req, res) => {
  try {
    const giatri = req.body.giatri;
    const results = await createKICHCO(giatri);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const DanhSachkichco = async (req, res) => {
  try {
    const results = await getKICHCO();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const Capnhatkichco = async (req, res) => {
  try {
    const magiatri = req.params.magiatri;

    const giatri = req.body.giatri;

    const results = await updateKICHCO(magiatri, giatri);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaKichco = async (req, res) => {
  try {
    const magiatri = req.query.magiatri;
    const results = await deleteKICHCO(magiatri);
    console.log(magiatri);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

// -------------------------------------------------------------------------------------------------
const Taoloai = async (req, res) => {
  try {
    const name = req.body.name;
    const results = await createLOAI(name);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const DanhSachloai = async (req, res) => {
  try {
    const results = await getLOAI();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const Capnhatloai = async (req, res) => {
  try {
    const maloai = req.params.maloai;

    const name = req.body.name;

    const results = await updateLOAI(maloai, name);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaLoai = async (req, res) => {
  try {
    const maloai = req.query.maloai;
    console.log(maloai);
    const results = await deleteLOAI(maloai);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//-----------------------------------------------------------------------------------------
//Sản phẩm

const DanhSachsanpham = async (req, res) => {
  try {
    const results = await getSANPHAM();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const DanhSachthongkesanphamvoiHang = async (req, res) => {
  try {
    const results = await getSANPHAMWithHang();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const DanhSachthongkesanphamvoiLoai = async (req, res) => {
  try {
    const results = await getSANPHAMWithLoai();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const DanhSachthongkesanphamvoiThang = async (req, res) => {
  try {
    const thang = req.body.thang;
    const nam = req.body.nam;
    const results = await getSANPHAMWithThang(thang, nam);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};
const DanhSachthongkesanphamvoiNam = async (req, res) => {
  try {
    const results = await getSANPHAMwithYear();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const DanhSachsanphamwithPaginate = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    const results = await getSANPHAMwthPaginate(page, limit);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  }
};

const DanhSachthongkesanpham = async (req, res) => {
  try {
    const results = await getTongSoLuongSANPHAM();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.error(error.message);
  }
};

const Taosanpham = async (req, res) => {
  try {
    const TengiayShoe = req.body.TengiayShoe;
    const HanggiayShoe = req.body.HanggiayShoe;
    const GiabanShoe = req.body.GiabanShoe;
    // const GiamgiaShoe = req.body.GiamgiaShoe;
    const LoaiGiayShoe = req.body.LoaiGiayShoe;
    const SizeGiayShoe = req.body.SizeGiayShoe;
    const SoLuongShoe = req.body.SoLuongShoe;
    const ThongtinShoe = req.body.ThongtinShoe;

    const results = await createSANPHAM(
      TengiayShoe,
      HanggiayShoe,
      GiabanShoe,
      // GiamgiaShoe,
      req.file.filename,
      LoaiGiayShoe,
      SizeGiayShoe,
      SoLuongShoe,
      ThongtinShoe
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const Capnhatsanpham = async (req, res) => {
  try {
    const filename = req.file ? req.file.filename : null;
    const masanpham = req.params.masanpham;
    const TengiayShoe = req.body.TengiayShoe;
    const HanggiayShoe = req.body.HanggiayShoe;
    const GiabanShoe = req.body.GiabanShoe;
    // const GiamgiaShoe = req.body.GiamgiaShoe;
    const LoaiGiayShoe = req.body.LoaiGiayShoe;
    const SizeGiayShoe = req.body.SizeGiayShoe;
    const SoLuongShoe = req.body.SoLuongShoe;
    const ThongtinShoe = req.body.ThongtinShoe;

    const results = await updateSANPHAM(
      masanpham,
      TengiayShoe,
      HanggiayShoe,
      GiabanShoe,
      // GiamgiaShoe,
      filename,
      LoaiGiayShoe,
      SizeGiayShoe,
      SoLuongShoe,
      ThongtinShoe
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const Xoasanpham = async (req, res) => {
  try {
    const masanpham = req.params.masanpham;
    const results = await Deletesanpham(masanpham);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  //hãng
  CapnhatHang,
  XoaHang,
  DanhSachHang,
  TaoHang,
  //kích cỡ
  DanhSachkichco,
  Capnhatkichco,
  Taokichco,
  XoaKichco,
  //loại sản phẩm
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  XoaLoai,
  //sản phẩm
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
};
