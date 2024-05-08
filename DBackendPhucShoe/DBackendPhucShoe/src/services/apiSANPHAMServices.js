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
  const [results, fields] = await connection.execute("SELECT * FROM `sanpham`");
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
  const [results, fields] = await connection.execute(`
  SELECT SUM(GIA) AS TotalPrice
  FROM SANPHAM;
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
};

module.exports = {
  getSANPHAM,
  createSANPHAM,
  updateSANPHAM,
  Deletesanpham,
  getTongSoLuongSANPHAM,
};
