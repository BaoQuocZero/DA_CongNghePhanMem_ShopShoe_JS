const connection = require("../config/old.js");
const {
  createLoginUser,
  getUser,
  postLoginUser,
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

module.exports = {
  CreateUser,
  getAllUser,
  loginUser,
};
