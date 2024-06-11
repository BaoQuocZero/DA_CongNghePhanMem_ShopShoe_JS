const connection = require("../config/old.js");

const getKICHCO = async () => {
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM `kichco`"
    );
    return {
      EM: "xem thoong tin thanh cong",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const createKICHCO = async (kichco) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from kichco where GIATRI = ?`,
      [kichco]
    );

    if (results.length > 0) {
      return {
        EM: "kích cỡ đã tồn tại",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1, fields1] = await connection.execute(
        "insert into kichco (GIATRI)  values (?)",
        [kichco]
      );
      return {
        EM: "thêm kích cỡ mới thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const updateKICHCO = async (makichco, kichco) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from kichco where MAGIATRI = ?`,
      [makichco]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "update KICHCO set GIATRI = ? where MAGIATRI = ?",
        [kichco, makichco]
      );
      return {
        EM: "update kích cỡ thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy kích cỡ phù hợp",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const deleteKICHCO = async (magiatri) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from kichco where MAGIATRI = ?`,
      [magiatri]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "delete from kichco where MAGIATRI = ?",
        [magiatri]
      );
      return {
        EM: "xóa kích cỡ thành công",
        EC: 1,
        DT: [],
      };
    } else {
      return {
        EM: "không thể xóa kích cỡ ",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    return {
      EM: "không thể xóa kích cỡ vì trùng khóa",
      EC: 0,
      DT: [],
    };
  }
};

module.exports = {
  getKICHCO,
  createKICHCO,
  updateKICHCO,
  deleteKICHCO,
};
