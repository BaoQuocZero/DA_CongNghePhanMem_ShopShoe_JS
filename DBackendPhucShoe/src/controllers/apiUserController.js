const connection = require("../config/old.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
  getThongtinUser,
  updateUser,
  updateAvatarUser,
  DeleteUser,
  postLoginAdmin,
  createLoginAdmin,
  updatePasswordUser,
  buyProductpost,
  updateAdminPassword,
} = require("../services/apiCRUDServices");

const CreateUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginUser(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const results = await getUser();
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await postLoginUser(taikhoan, matkhau);
    console.log("User logged in", results);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

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

const CapnhatAdmin = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const mk2 = req.body.password2;
    const matkhaumoi = req.body.newpassword;
    const results = await updateAdminPassword(
      taikhoan,
      matkhau,
      mk2,
      matkhaumoi
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

const CapnhatAvatarUser = async (req, res) => {
  try {
    const taikhoan = req.params.username;
    const results = await updateAvatarUser(taikhoan, req.file.filename);
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
    console.log(username, password);
    const results = await postLoginAdmin(username, password);
    if (results && results.DT && results.DT.access_token) {
      res.cookie("jwt", results.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }
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
  try {
    const taikhoan = req.body.username;
    const matkhau = req.body.password;
    const results = await createLoginAdmin(taikhoan, matkhau);
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Logout Thành Công !!!",
      EC: 0,
      DT: " ",
    });
  } catch {
    return res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: " ",
    });
  }
};

const muahangUser = async (req, res) => {
  try {
    const taikhoan = req.body.username;
    console.log("username", taikhoan);
    const ten = req.body.name;
    const diachi = req.body.dataDiachi;
    const ghichu = req.body.note;
    const masp = req.body.IdSP;
    const sodienthoai = req.body.phoneNumber;
    const soluong = req.body.SoluongDaMua;
    const thanhtien = req.body.Tongtien;
    const results = await buyProductpost(
      taikhoan,
      ten,
      diachi,
      ghichu,
      sodienthoai,
      masp,
      soluong,
      thanhtien
    );
    return res.status(200).json({
      EM: results.EM,
      EC: results.EC,
      DT: results.DT,
    });
  } catch {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};
const countUsers = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT COUNT(*) AS totalUsers FROM users`
    );
    console.log("check", results);
    return res.status(200).json({
      EM: "Tính tổng số lượng user thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    return res.status(200).json({
      EM: "404 not found",
    });
  }
};
module.exports = {
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
  logoutUser,
  muahangUser,
  countUsers,
  CapnhatAdmin,
};
