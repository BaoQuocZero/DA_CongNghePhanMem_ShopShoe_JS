const { name } = require("ejs");
const connection = require("../config/old.js");
const {
  createHANG,
  updateHANG,
  getHANG,
} = require("../services/apiHANGServices");
const multer = require("multer");
const {
  createKICHCO,
  updateKICHCO,
  getKICHCO,
} = require("../services/apiKICHCOServices");
const {
  getLOAI,
  createLOAI,
  updateLOAI,
} = require("../services/apiLOAIServices");

const {
  getSANPHAM,
  createSANPHAM,
  updateSANPHAM,
  Deletesanpham,
  getTongSoLuongSANPHAM,
} = require("../services/apiSANPHAMServices");

// -------------------------------------------------------------------------------------------------
//hãng
const TaoHang = async (req, res) => {
  const hang = req.body.hang;

  console.log(req.body);
  const results = await createHANG(hang);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const DanhSachHang = async (req, res) => {
  const results = await getHANG();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
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
    const taikhoan = req.params.username;
    const results = await DeleteUser(taikhoan);
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
  const giatri = req.body.giatri;

  console.log(req.body);
  const results = await createKICHCO(giatri);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const DanhSachkichco = async (req, res) => {
  const results = await getKICHCO();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
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

// -------------------------------------------------------------------------------------------------
const Taoloai = async (req, res) => {
  const name = req.body.name;

  console.log(req.body);
  const results = await createLOAI(name);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const DanhSachloai = async (req, res) => {
  const results = await getLOAI();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
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

//-----------------------------------------------------------------------------------------
//Sản phẩm

const DanhSachsanpham = async (req, res) => {
  const results = await getSANPHAM();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const DanhSachthongkesanpham = async (req, res) => {
  const results = await getTongSoLuongSANPHAM();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const Taosanpham = async (req, res) => {
  try {
    const TengiayShoe = req.body.TengiayShoe;
    const HanggiayShoe = req.body.HanggiayShoe;
    const GiabanShoe = req.body.GiabanShoe;
    const GiamgiaShoe = req.body.GiamgiaShoe;
    const LoaiGiayShoe = req.body.LoaiGiayShoe;
    const SizeGiayShoe = req.body.SizeGiayShoe;
    const SoLuongShoe = req.body.SoLuongShoe;
    const ThongtinShoe = req.body.ThongtinShoe;

    const results = await createSANPHAM(
      TengiayShoe,
      HanggiayShoe,
      GiabanShoe,
      GiamgiaShoe,
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
    const masanpham = req.params.masanpham;
    const TengiayShoe = req.body.TengiayShoe;
    const HanggiayShoe = req.body.HanggiayShoe;
    const GiabanShoe = req.body.GiabanShoe;
    const GiamgiaShoe = req.body.GiamgiaShoe;
    const LoaiGiayShoe = req.body.LoaiGiayShoe;
    const SizeGiayShoe = req.body.SizeGiayShoe;
    const SoLuongShoe = req.body.SoLuongShoe;
    const ThongtinShoe = req.body.ThongtinShoe;
    const results = await updateSANPHAM(
      masanpham,
      TengiayShoe,
      HanggiayShoe,
      GiabanShoe,
      GiamgiaShoe,
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
  //loại sản phẩm
  DanhSachloai,
  Taoloai,
  Capnhatloai,
  //sản phẩm
  DanhSachsanpham,
  DanhSachthongkesanpham,
  Taosanpham,
  Capnhatsanpham,
  Xoasanpham,
};
