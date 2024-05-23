const connection = require("../config/old.js");

const createSANPHAM = async (
  tengiay,
  hanggiay,
  giaban,
  giamgia,
  mota,
  loaigiay,
  sizegiay,
  soluong,
  thongtin
) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from sanpham where tensanpham = ?`,
      [tengiay]
    );

    if (results.length > 0) {
      return {
        EM: "sản phẩm đã tồn tại trong kho",
        EC: 0,
        DT: [],
      };
    } else {
      const [results1, fields1] = await connection.execute(
        "insert into sanpham (tensanpham,mahang,gia,giamgia,description,maloai,magiatri,soluong,thongtinsanpham)  values (?,?,?,?,?,?,?,?,?)",
        [
          tengiay,
          hanggiay,
          giaban,
          giamgia,
          mota,
          loaigiay,
          sizegiay,
          soluong,
          thongtin,
        ]
      );
      return {
        EM: "thêm sản phẩm mới thành công",
        EC: 1,
        DT: results1,
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const getSANPHAM = async () => {
  const [results, fields] = await connection.execute(
    "SELECT * FROM `sanpham` order by masp DESC"
  );
  const productsWithImageUrls = results.map((product) => {
    return {
      ...product,
      imageUrl: `http://localhost:8081/api/v1/images/${product.description}`,
    };
  });
  return {
    EM: "xem thoong tin thanh cong",
    EC: 1,
    DT: productsWithImageUrls,
  };
};

const getSANPHAMwthPaginate = async (page, limit) => {
  try {
    if (page && limit) {
      console.log("check data", page, limit);
      let offset = (page - 1) * limit;

      const [results, fields] = await connection.execute(
        "SELECT * FROM `sanpham` order by masp DESC LIMIT ? OFFSET ? ",
        [limit, offset]
      );

      // Thêm đường dẫn đầy đủ cho mỗi sản phẩm
      const productsWithImageUrls = results.map((product) => {
        return {
          ...product,
          imageUrl: `http://localhost:3003/api/v1/images/${product.description}`,
        };
      });

      const totalCountResult = await connection.execute(
        "SELECT COUNT(*) AS total FROM `sanpham`"
      );
      const totalCount = totalCountResult[0][0].total;

      let totalPages = Math.ceil(totalCount / limit);
      let data = {
        totalRows: productsWithImageUrls,
        totalPages: totalPages,
        users: fields,
      };
      console.log("check total", page, limit, data.totalPages);
      return {
        EM: "ok",
        EC: 1,
        DT: data,
      };
    } else {
      const [results, fields] = await connection.execute(
        "SELECT * FROM `sanpham`"
      );
      const productsWithImageUrls = results.map((product) => {
        return {
          ...product,
          imageUrl: `http://localhost:3003/api/v1/images/${product.description}`,
        };
      });
      return {
        EM: "ok",
        EC: 1,
        DT: productsWithImageUrls,
      };
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateSANPHAM = async (
  masanpham,
  tengiay,
  hanggiay,
  giaban,
  giamgia,
  mota,
  loaigiay,
  sizegiay,
  soluong,
  thongtin
) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from sanpham where masp= ?`,
      [masanpham]
    );

    if (results.length > 0) {
      if (mota === null) {
        const [results1, fields] = await connection.execute(
          "update sanpham set tensanpham = ?,mahang = ?,gia = ? ,giamgia=?,maloai=?,magiatri=?,soluong=?,thongtinsanpham=? where masp=?",
          [
            tengiay,
            hanggiay,
            giaban,
            giamgia,

            loaigiay,
            sizegiay,
            soluong,
            thongtin,
            masanpham,
          ]
        );
        return {
          EM: "update sản phẩm thành công",
          EC: 1,
          DT: results1,
        };
      } else {
        const [results1, fields] = await connection.execute(
          "update sanpham set tensanpham = ?,mahang = ?,gia = ? ,giamgia=?,description=?,maloai=?,magiatri=?,soluong=?,thongtinsanpham=? where masp=?",
          [
            tengiay,
            hanggiay,
            giaban,
            giamgia,
            mota,
            loaigiay,
            sizegiay,
            soluong,
            thongtin,
            masanpham,
          ]
        );
        return {
          EM: "update sản phẩm thành công",
          EC: 1,
          DT: results1,
        };
      }
    } else {
      return {
        EM: "không tìm thấy sản phẩm cần cập nhật",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const Deletesanpham = async (masanpham) => {
  try {
    const [results, fields] = await connection.execute(
      "delete from sanpham where masp = ?",
      [masanpham]
    );

    return {
      EM: "xóa sản phẩm thành công !!!",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.error("Error in postLoginUser:", error);
    throw error;
  }
};

const getTongSoLuongSANPHAM = async () => {
  try {
    const [results, fields] = await connection.execute(`
    SELECT SUM(GIA) AS TotalPrice
    FROM sanpham;
  `);
    const [results1, fields1] = await connection.execute(`
    SELECT count(madonhang) AS Totalsoluongdonhang
    FROM donhang;
  `);
    const [results2, fields2] = await connection.execute(`
  SELECT sum(soluong) AS Totalsoluongsanpham
  FROM chitietdonhang;
  `);
    return {
      EM: "xem thoong tin thanh cong",
      EC: 1,
      DT: {
        results,
        results1,
        results2,
      },
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getSANPHAM,
  createSANPHAM,
  updateSANPHAM,
  Deletesanpham,
  getTongSoLuongSANPHAM,
  getSANPHAMwthPaginate,
};
