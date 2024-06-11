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
  return results;
};

const createLoginUser = async (taikhoan, password) => {
  try {
    let taikhoantontai = await checktaikhoan(taikhoan);
    if (taikhoantontai === true) {
      return {
        message: "tai khoan da ton tai",
        code: 1,
      };
    }
    const matkhauHashed = hashPassword(password);
    console.log(matkhauHashed);
    const [results, fields] = await connection.execute(
      `INSERT INTO users (taikhoan,matkhau) VALUES (?, ?)`,
      [taikhoan, matkhauHashed]
    );
    return results;
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const checktaikhoan = async (taikhoan) => {
  const [results, fields] = await connection.execute(
    "SELECT * FROM `users` where `taikhoan` = ?",
    [taikhoan]
  );
  if (results) {
    return true;
  } else {
    return false;
  }
};

const postLoginUser = async (taikhoan, password) => {
  const [results, fields] = await connection.execute(
    "SELECT * FROM `users` where `taikhoan` = ?",
    [taikhoan]
  );
  console.log(results);
  if (results) {
    let isCorrectPass = checkPassword(password, results[0].matkhau);
    if (isCorrectPass === true) {
      //let token

      //test roles

      let payload = {
        taikhoan: taikhoan,

        matkhau: isCorrectPass,
      };

      return {
        message: "ok",
        taikhoan: taikhoan,
        matkhau: results.matkhau,
      };
    }
  }
};

module.exports = {
  createLoginUser,
  getUser,
  postLoginUser,
};
