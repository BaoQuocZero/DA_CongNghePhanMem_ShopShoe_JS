const connection = require("../config/old.js");

const getLOAI = async () => {
  const [results, fields] = await connection.execute("SELECT * FROM `loai`");
  return {
    EM: "xem thoong tin thanh cong",
    EC: 1,
    DT: results,
  };
};

const createLOAI = async (name) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from loai where name = ?`,
      [name]
    );

    if (results.length > 0) {
      return {
        EM: "Thể loại đã tồn tại",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1, fields1] = await connection.execute(
        "insert into loai (name)  values (?)",
        [name]
      );
      return {
        EM: "thêm thể loại mới thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const updateLOAI = async (maloai, name) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from loai where MALOAI = ?`,
      [maloai]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "update loai set name = ? where maloai = ?",
        [name, maloai]
      );
      return {
        EM: "update thể loại thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy thể loại",
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
  getLOAI,
  createLOAI,
  updateLOAI,
};
