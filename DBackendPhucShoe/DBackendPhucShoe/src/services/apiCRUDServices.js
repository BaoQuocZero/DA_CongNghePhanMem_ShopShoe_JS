const bcrypt = require("bcrypt");
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);

const connection = require("../config/old.js");
const { createJWT } = require("../middleware/JWTaction");
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //let check = bcrypt.compareSync(password, hashPassword);
  return hashPassword;
};

const checkPassword = (inputpassword, hashpass) => {
  return bcrypt.compareSync(inputpassword, hashpass);
};

const getUser = async () => {
  const [results, fields] = await connection.execute(
    "SELECT u.*,k.makhachhang,k.ten,k.avatar, k.diachi,k.ghichu,k.sodienthoai FROM `users` as u, khachhang as k where u.taikhoan = k.taikhoan"
  );
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
        EM: "Tài Khoản Đã Tồn Tại O.o",
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
    let newId = generateRandomCustomerID();
    const [results1, fields1] = await connection.execute(
      "insert into khachhang (makhachhang,taikhoan) values (?,?)",
      [newId, taikhoan]
    );
    return {
      EM: "tạo tài khoản thành công",
      EC: 1,
      DT: { results, results1 },
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
        let payload = {
          taikhoan: results[0].taikhoan,
          matkhau: results[0].matkhau,
        };
        let token = createJWT(payload);
        return {
          EM: "Đăng nhập thành công",
          EC: 1,
          DT: {
            access_token: token,
            data: results,
          },
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

const getThongtinUser = async (taikhoan) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT k.*,u.matkhau FROM `khachhang` as k, users as u where u.taikhoan = k.taikhoan and u.taikhoan = ?",
      [taikhoan]
    );
    console.log(results);
    if (results.length > 0) {
      const [results1, fields1] = await connection.execute(
        "SELECT k.ten,k.diachi,k.ghichu,k.sodienthoai,d.madonhang,d.ngaydonhang,c.trangthai,s.tensanpham,s.gia,c.soluong,s.gia * c.soluong as tongtien from khachhang as k, donhang as d, chitietdonhang as c, sanpham as s where k.makhachhang = d.makhachhang and d.madonhang = c.madonhang and c.masp = s.masp and k.taikhoan = ?",
        [taikhoan]
      );
      return {
        EM: "tìm thấy user !!!",
        EC: 1,
        DT: {
          results,
          results1,
        },
      };
    } else {
      return {
        EM: "user này không tồn tại",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const generateRandomCustomerID = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

const updateUser = async (taikhoan, ten, diachi, sodienthoai) => {
  try {
    const [results, fields] = await connection.execute(
      "select * from users where taikhoan = ?",
      [taikhoan]
    );
    console.log("check resultls", results);
    if (results.length > 0) {
      const [results2, fields] = await connection.execute(
        "update khachhang set ten = ?, diachi = ?, sodienthoai = ? where taikhoan = ?",
        [ten, diachi, sodienthoai, taikhoan]
      );
      return {
        EM: "thay đổi thông tin thành công",
        EC: 1,
        DT: results2,
      };
    } else {
      return {
        EM: "Tài khoản không tồn tại",
        EC: 0,
        DT: [],
      };
    }
    console.log(results);
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const updateAvatarUser = async (taikhoan, avatar) => {
  try {
    const [results, fields] = await connection.execute(
      "select * from users where taikhoan = ?",
      [taikhoan]
    );
    console.log("check resultls", results);
    if (results.length > 0) {
      const [results2, fields] = await connection.execute(
        "update khachhang set avatar = ? where taikhoan = ?",
        [avatar, taikhoan]
      );
      return {
        EM: "thay đổi avatar thành công",
        EC: 1,
        DT: results2,
      };
    } else {
      return {
        EM: "Tài khoản không tồn tại",
        EC: 0,
        DT: [],
      };
    }
    console.log(results);
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const updatePasswordUser = async (taikhoan, matkhaucu, matkhaumoi) => {
  try {
    const [results, fields] = await connection.execute(
      "select * from users where taikhoan = ?",
      [taikhoan]
    );
    if (results.length > 0) {
      const isCorrectPass = await bcrypt.compare(matkhaucu, results[0].matkhau);
      if (isCorrectPass) {
        const matkhauHashed = hashPassword(matkhaumoi);
        const [results1, fields] = await connection.execute(
          "update users set matkhau = ? where taikhoan = ?",
          [matkhauHashed, taikhoan]
        );
        return {
          EM: "thay đổi mật khẩu thành công",
          EC: 1,
          DT: results1,
        };
      } else {
        return {
          EM: "không thể thay đổi mật khẩu",
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
    console.log(results);
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const DeleteUser = async (taikhoan) => {
  try {
    const [results, fields] = await connection.execute(
      "delete from khachhang where taikhoan = ?",
      [taikhoan]
    );
    const [results2, fields2] = await connection.execute(
      "delete from users where taikhoan = ?",
      [taikhoan]
    );

    return {
      EM: "xóa tài khoản thành công !!!",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const UpdateAdmin = async (taikhoan, matkhau) => {
  try {
    let taikhoantontai = await checkTaiKhoanAdmin(taikhoan);
    if (taikhoantontai === true) {
      return {
        EM: "Tài Khoản Đã Tồn Tại O.o",
        EC: 0,
        DT: [],
      };
    }
    const matkhauHashed = hashPassword(password);
    console.log(matkhauHashed);
    const [results, fields] = await connection.execute(
      `INSERT INTO admin (username,password) VALUES (?, ?)`,
      [taikhoan, matkhauHashed]
    );

    return {
      EM: "tạo tài khoản thành công",
      EC: 1,
      DT: { results },
    };
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const checkTaiKhoanAdmin = async (taikhoan) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM `admin` where `username` = ?",
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

//Login for admin
const postLoginAdmin = async (username, password) => {
  try {
    console.log(username);
    const [results, fields] = await connection.execute(
      "SELECT * FROM `admin` where `username` = ?",
      [username]
    );
    if (results.length > 0) {
      const isCorrectPass = await bcrypt.compare(password, results[0].password);
      if (isCorrectPass) {
        let payload = {
          taikhoan: results[0].taikhoan,
          matkhau: results[0].password,
        };
        let token = createJWT(payload);
        return {
          EM: "Đăng nhập thành công",
          EC: 1,
          DT: {
            access_token: token,
            data: results,
          },
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

//create admin account
const createLoginAdmin = async (taikhoan, password) => {
  const username = taikhoan;

  try {
    let taikhoantontai = await checktaikhoanAdmin(username);
    if (taikhoantontai === true) {
      return {
        EM: "Tài khoản đã tồn tại   ~(O.o)~",
        EC: 0,
        DT: [],
      };
    }
    const matkhauHashed = hashPassword(password);
    console.log(matkhauHashed);
    const [results, fields] = await connection.execute(
      `INSERT INTO admin (username,password) VALUES (?, ?)`,
      [username, matkhauHashed]
    );

    return {
      EM: "tạo tài khoản thành công",
      EC: 1,
      DT: { results },
    };
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

//check admin
const checktaikhoanAdmin = async (username) => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM `admin` where `username` = ?",
      [username]
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

module.exports = {
  createLoginUser,
  getUser,
  postLoginUser,
  getThongtinUser,
  updateUser,
  updateAvatarUser,
  DeleteUser,
  UpdateAdmin,
  postLoginAdmin,
  createLoginAdmin,
  updatePasswordUser,
};
