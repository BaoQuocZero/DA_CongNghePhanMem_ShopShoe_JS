const connection = require("../config/old.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
} = require("../services/apiCRUDServices");

const CreateUser = async (req, res) => {
  const taikhoan = req.body.taikhoan;
  const matkhau = req.body.matkhau;
  const results = await createLoginUser(taikhoan, matkhau);
  return res.status(200).json({
    message: "create user successfully",
    data: results,
  });
};

const getAllUser = async (req, res) => {
  const results = await getUser();
  return res.status(200).json({
    message: "create user successfully",
    data: results,
  });
};

const loginUser = async (req, res) => {
  const taikhoan = req.body.taikhoan;
  const matkhau = req.body.matkhau;
  const results = await postLoginUser(taikhoan, matkhau);
  return res.status(200).json({
    message: "login user successfully",
    data: results,
  });
};

module.exports = {
  CreateUser,
  getAllUser,
  loginUser,
};
