const connection = require("../config/old.js");

const getDonHangChuaGiao = async () => {
  const [results, fields] = await connection.execute(
    "SELECT k.ten,k.diachi,k.ghichu,k.sodienthoai,s.tensanpham,s.gia,h.tenhang,kc.GIATRI,l.name,s.description,c.soluong,c.thanhtien,d.madonhang,d.ngaydonhang,d.trangthai FROM khachhang AS k JOIN donhang AS d ON k.makhachhang = d.makhachhang JOIN chitietdonhang AS c ON d.madonhang = c.madonhang JOIN sanpham AS s ON c.masp = s.masp JOIN hang AS h ON s.mahang = h.mahang JOIN kichco AS kc ON s.magiatri = kc.magiatri JOIN loai AS l ON s.maloai = l.maloai WHERE d.trangthai = 'ChuaGiao';"
  );
  const productsWithImageUrls = results.map((product) => {
    return {
      ...product,
      imageUrl: `http://localhost:8081/api/v1/images/${product.description}`,
    };
  });
  return {
    EM: "xem đơn hàng chưa giao thanh cong",
    EC: 1,
    DT: productsWithImageUrls,
  };
};

const getDonHangDaGiao = async () => {
  const [results, fields] = await connection.execute(
    "SELECT k.ten,k.diachi,k.ghichu,k.sodienthoai,s.tensanpham,s.gia,h.tenhang,kc.GIATRI,l.name,s.description,c.soluong,c.thanhtien,d.madonhang,d.ngaydonhang,d.trangthai FROM khachhang AS k JOIN donhang AS d ON k.makhachhang = d.makhachhang JOIN chitietdonhang AS c ON d.madonhang = c.madonhang JOIN sanpham AS s ON c.masp = s.masp JOIN hang AS h ON s.mahang = h.mahang JOIN kichco AS kc ON s.magiatri = kc.magiatri JOIN loai AS l ON s.maloai = l.maloai WHERE d.trangthai = N'Đã Giao Thành Công';"
  );
  const productsWithImageUrls = results.map((product) => {
    return {
      ...product,
      imageUrl: `http://localhost:8081/api/v1/images/${product.description}`,
    };
  });
  return {
    EM: "xem đơn hàng đã giao thanh cong",
    EC: 1,
    DT: productsWithImageUrls,
  };
};

const updateStatus = async (madonhang) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from donhang where madonhang = ?`,
      [madonhang]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "update donhang set trangthai = 'Đã Giao Thành Công' where madonhang = ?",
        [madonhang]
      );
      return {
        EM: "update trạng thái thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy đơn hàng cần update",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const getDonHangHuy = async () => {
  const [results, fields] = await connection.execute(
    "SELECT k.ten,k.diachi,k.ghichu,k.sodienthoai,s.tensanpham,s.gia,h.tenhang,kc.GIATRI,l.name,s.description,c.soluong,c.thanhtien,d.madonhang,d.ngaydonhang,d.trangthai FROM khachhang AS k JOIN donhang AS d ON k.makhachhang = d.makhachhang JOIN chitietdonhang AS c ON d.madonhang = c.madonhang JOIN sanpham AS s ON c.masp = s.masp JOIN hang AS h ON s.mahang = h.mahang JOIN kichco AS kc ON s.magiatri = kc.magiatri JOIN loai AS l ON s.maloai = l.maloai WHERE d.trangthai = N'Đã Hủy';"
  );
  const productsWithImageUrls = results.map((product) => {
    return {
      ...product,
      imageUrl: `http://localhost:8081/api/v1/images/${product.description}`,
    };
  });
  return {
    EM: "xem đơn hàng đã hủy thanh cong",
    EC: 1,
    DT: productsWithImageUrls,
  };
};

const updateStatusHuydon = async (madonhang) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from donhang where madonhang = ?`,
      [madonhang]
    );

    if (results.length > 0) {
      const [results1, fields] = await connection.execute(
        "update donhang set trangthai = 'Đã Hủy' where madonhang = ?",
        [madonhang]
      );
      return {
        EM: "update trạng thái thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy đơn hàng cần update",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.error("Error creating login user:", error);
    throw error;
  }
};

const DeleteDonhangHuy = async (madonhang) => {
  try {
    const [results, fields] = await connection.execute(
      `select * from donhang where madonhang = ?`,
      [madonhang]
    );

    if (results.length > 0) {
      const [results1, fields1] = await connection.execute(
        "DELETE FROM chitietdonhang WHERE madonhang = ?;",
        [madonhang]
      );
      const [results2, fields2] = await connection.execute(
        "DELETE FROM donhang WHERE madonhang = ? and trangthai = 'Đã Hủy'",
        [madonhang]
      );
      return {
        EM: "xóa đơn hàng thành công",
        EC: 1,
        DT: results1,
      };
    } else {
      return {
        EM: "không tìm thấy đơn hàng cần xóa",
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
  getDonHangChuaGiao,
  getDonHangDaGiao,
  updateStatus,
  getDonHangHuy,
  updateStatusHuydon,
  DeleteDonhangHuy,
};