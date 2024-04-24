const bcrypt = require("bcrypt");
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const connection = require("../config/old.js");

const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};

const checkPassword = (inputpassword, hashpass) => {
  return bcrypt.compareSync(inputpassword, hashpass);
};

const getUser = async () => {
  const [results, fields] = await connection.execute("SELECT * FROM `users`");
  return {
    EM: "xem thoong tin thanh cong",
    EC: 1,
    DT: results,
  };
};
const createLoginUser = async (taikhoan, password) => {
  try {
    let taikhoantontai = await checktaikhoan(taikhoan);
    if (taikhoantontai === true) {
      return {
        EM: "tai khoan da ton tai",
        EC: 0,
        DT: [],
      };
    }
    const matkhauHashed = hashPassword(password);
    console.log(matkhauHashed);
    const [results, fields] = await connection.execute(
      `INSERT INTO users (taikhoan,matkhau) VALUES (?, ?)`,
      [taikhoan, matkhauHashed]
    );
    return {
      EM: "tạo tài khoản thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const checktaikhoan = async (taikhoan) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM `users` where `taikhoan` = ?",
      [taikhoan]
    );

    if (results.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const postLoginUser = async (taikhoan, password) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM `users` where `taikhoan` = ?",
      [taikhoan]
    );
    if (results.length > 0) {
      const isCorrectPass = await bcrypt.compare(password, results[0].matkhau);
      if (isCorrectPass) {
        return {
          EM: "Đăng nhập thành công",
          EC: 1,
          DT: results,
        };
      } else {
        return {
          EM: "Mật khẩu không chính xác",
          EC: 0,
          DT: [],
        };
      }
    } else {
      return {
        EM: "Tài khoản không tồn tại",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};
module.exports = {
  createLoginUser,
  getUser,
  postLoginUser,
};
