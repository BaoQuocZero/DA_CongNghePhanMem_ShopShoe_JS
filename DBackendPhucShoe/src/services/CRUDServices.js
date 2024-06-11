const connection = require("../config/database");
const getAllSanPham = async () => {
  let [results, fields] = await (
    await connection
  ).execute("select * from SANPHAM ORDER BY MASP DESC ");
  return results;
};
const getAllHang = async () => {
  let [results, fields] = await (
    await connection
  ).execute("select * from HANG ");
  return results;
};
const getUpdateSanPhamID = async (
  MASP,
  tenSanpham,
  TENHANG,
  GIA,
  MOTA,
  MALOAI,
  SIZE,
  SOLUONG,
  image
) => {
  let [results, fields] = await (
    await connection
  ).query(
    `UPDATE SANPHAM 
         SET TENSANPHAM = ?, TENHANG = ?, GIA = ?, description = ?, MALOAI = ?, GIATRI = ?, SOLUONG = ?, THONGTINSANPHAM = ? 
         WHERE MASP = ?;`,
    [tenSanpham, TENHANG, GIA, image, MALOAI, SIZE, SOLUONG, MOTA, MASP]
  );
  return results;
};

const getHang = async (Tenhang) => {
  const [results, fields] = await (
    await connection
  ).execute(`INSERT INTO HANG (TENHANG) VALUES (?);`, [Tenhang]);

  return results;
};
const getSize = async (Size) => {
  const [results, fields] = await (
    await connection
  ).execute(`INSERT INTO KICHCO (GIATRI) VALUES (?);`, [Size]);

  return results;
};
//--------INFO USER-----------------------
const getInfoUser = async () => {
  let [results, fields] = await (
    await connection
  ).execute("select * from KHACHHANG ");
  return results;
};
// ---------LOAI SAN SPHAM----------------
const getLoaisanpham = async (idLoaiSP, tenLoaiSP) => {
  const [results, fields] = await (
    await connection
  ).execute(`INSERT INTO LOAI (MALOAI,name) VALUES (?,?);`, [
    idLoaiSP,
    tenLoaiSP,
  ]);

  return results;
};

const getAllLoaiSP = async () => {
  let [results, fields] = await (
    await connection
  ).execute("select * from LOAI ");
  return results;
};
// ---------------------------

// const getUserById = async (userID) => {

//     const [results, fields] = await (await connection).query('SELECT * FROM User WHERE id = ?', [userID]);

//     return results;
// }

// const getDonHang = async (req, res) => {
//     let [results, fields] = await (await connection).execute('select * from DONHANG order by NGAYDONHANG DESC ')
//     return results;
// }

const getDonHang = async (req, res) => {
  try {
    let [results, fields] = await (
      await connection
    ).execute(
      'SELECT * FROM DONHANG WHERE TRANGTHAI <> "Đã Giao Thành Công" ORDER BY NGAYDONHANG DESC'
    );

    return results;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng chưa giao:", error);
    throw error;
  }
};

module.exports = {
  getAllSanPham,
  getUpdateSanPhamID,
  // getUserById,
  getHang,
  getSize,
  getLoaisanpham,
  getAllLoaiSP,
  getAllHang,
  getInfoUser,
  getDonHang,
};
