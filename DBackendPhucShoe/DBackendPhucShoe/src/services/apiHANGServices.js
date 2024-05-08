const connection = require("../config/old.js");

const getHANG = async () => {
  const [results, fields] = await connection.execute("SELECT * FROM `hang`");
  return {
    EM: "xem thoong tin thanh cong",
    EC: 1,
    DT: results,
  };
};

const createHANG = async (hang) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from hang where TENHANG = ?`,
      [hang]
    );

    if (results.length > 0) {
      return {
        EM: "Hãng đã tồn tại",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1, fields1] = await connection.execute(
        "insert into hang (TENHANG)  values (?)",
        [hang]
      );
      return {
        EM: "thêm hãng mới thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const updateHANG = async (mahang, hang) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from hang where MAHANG = ?`,
      [mahang]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "update hang set tenhang = ? where mahang = ?",
        [hang, mahang]
      );
      return {
        EM: "update hãng thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy hãng",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

module.exports = {
  getHANG,
  createHANG,
  updateHANG,
};