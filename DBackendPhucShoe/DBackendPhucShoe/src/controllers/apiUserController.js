const connection = require("../config/old.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
  getThongtinUser,
  updateUser,
  DeleteUser,
  postLoginAdmin,
  createLoginAdmin,
  updatePasswordUser,
} = require("../services/apiCRUDServices");

const CreateUser = async (req, res) => {
  const taikhoan = req.body.username;
  const matkhau = req.body.password;
  console.log(req.body);
  const results = await createLoginUser(taikhoan, matkhau);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const getAllUser = async (req, res) => {
  const results = await getUser();
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};

const loginUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await postLoginUser(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getInfoUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const results = await getThongtinUser(taikhoan);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;

    const ten = req.body.ten;
    const diachi = req.body.diachi;
    const sodienthoai = req.body.sodienthoai;
    const results = await updateUser(taikhoan, ten, diachi, sodienthoai);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const CapnhatPasswordUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const matkhaucu = req.body.passwordcu;
    const matkhaumoi = req.body.passwordmoi;

    const results = await updatePasswordUser(taikhoan, matkhaucu, matkhaumoi);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const XoaUser = async (req, res) => {
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
const loginAdmin = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const results = await postLoginAdmin(username, password);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};
const registerAdmin = async (req, res) => {
  const taikhoan = req.body.username;
  const matkhau = req.body.password;
  console.log(req.body);
  const results = await createLoginAdmin(taikhoan, matkhau);
  return res.status(200).json({
    EM: results.EM,
    EC: results.EC,
    DT: results.DT,
  });
};
module.exports = {
  CreateUser,
  getAllUser,
  loginUser,
  getInfoUser,
  CapnhatUser,
  XoaUser,
  loginAdmin,
  registerAdmin,
  CapnhatPasswordUser,
};
