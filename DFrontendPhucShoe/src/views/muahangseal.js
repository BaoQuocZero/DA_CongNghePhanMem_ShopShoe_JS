// MuaHang.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/styles/muahang.css"; // Import tệp CSS
const host = "https://provinces.open-api.vn/api/";

const MuaHangSeal = () => {
  const { state } = useLocation();
  const giay = state?.giay;
  const soLuong = state?.soLuong;
  const size = state?.size;
  const image = state?.image;
  const tamtinh = (giay.price * ((100 - giay.seal) / 100)).toFixed(2) * soLuong;
  const navigate = useNavigate();
  // console.log(giay.image)
  // console.log(state);
  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    note: "",
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  // console.log('trist=>', district)
  // console.log('ward=>', ward)

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (
      [
        "name",
        "phoneNumber",
        "address",
        "note",
        "province",
        "district",
        "ward",
      ].includes(name)
    ) {
      setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  // Fetch provinces on component mount
  useEffect(() => {
    axios
      .get(`${host}?depth=1`)
      .then((response) => {
        setProvinces(response.data);
        const data = response.data.name;
      })
      .catch((error) => {
        console.error(error);
      });
  }, [host]);
  // Add host to the dependency array

  const handleProvinceChange = (provinceName, e) => {
    // Fetch districts based on selected province
    axios
      .get(`${host}p/${provinceName}?depth=2`)
      .then((response) => {
        console.log("tinh =>>", response.data.name);
        const province1 = response.data.name;
        setDistricts(response.data.districts);
        setCustomerInfo((prevInfo) => ({ ...prevInfo, province: province1 }));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDistrictChange = (provinceName, e) => {
    // Fetch districts based on selected province
    axios
      .get(`${host}d/${provinceName}?depth=2`)
      .then((response) => {
        console.log("huyen =>>", response.data.name);
        const dis = response.data.name;
        setWards(response.data.wards);
        setCustomerInfo((prevInfo) => ({ ...prevInfo, districts: dis }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleDistrictChange = (districtCode) => {
  //     // Fetch wards based on selected district
  //     axios.get(`${host}d/${districtCode}?depth=2`)
  //         .then((response) => {
  //             console.log('huyen =>>', response.data.name);
  //             const districtName = response.data.name;
  //             const fetchedDistricts = response.data.districts || []; // Ensure an array, even if it's empty
  //             const fetchedWards = response.data.wards || []; // Ensure an array, even if it's empty

  //             setDistricts(fetchedDistricts);
  //             setWards(fetchedWards);
  //             setCustomerInfo((prevInfo) => ({
  //                 ...prevInfo,
  //                 district: districtName,
  //                 ward: '', // Reset ward when district changes
  //             }));
  //         })
  //         .catch((error) => {
  //             console.error(error);
  //         });
  // };

  const handleOrder = () => {
    console.log("Thông tin người dùng:", customerInfo);
    console.log("Thông tin người dùng:", customerInfo.districts);
    // Call the printSelectedValues function to log the selected values

    // Additional logic to send customerInfo to the server or perform other actions

    // Thông báo đặt hàng thành công
    alert(
      "Cảm ơn bạn đã đặt hàng!" +
        customerInfo.name +
        "  " +
        customerInfo.phoneNumber +
        "  " +
        customerInfo.province +
        "  " +
        customerInfo.district +
        "  " +
        customerInfo.ward +
        "  " +
        customerInfo.note
    );
  };

  return (
    <div className="muahang-container">
      <a href="/some-valid-link" className="logo-muahang">
        <p>PhucShop</p>
      </a>

      <div className="container-setup">
        <div className="muahang-giay-info">
          <form className="muahang-form">
            <h5 className="thongtinh-muahang">Thông tin giao hàng</h5>
            <label className="muahang-label">
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="muahang-input hoten"
                placeholder="Họ và tên"
              />
            </label>{" "}
            <br />
            <label className="muahang-label">
              <input
                type="text"
                name="phoneNumber"
                value={customerInfo.phoneNumber}
                onChange={handleInputChange}
                className="muahang-input muahang-sdt"
                placeholder="Số điện thoại "
              />
            </label>
            <div className="container-tinhthanhvietnam">
              <select
                className="tinhthanh"
                name="province"
                onChange={(e) => handleProvinceChange(e.target.value)}
                value={customerInfo.provinces}
              >
                <option value="">Chọn</option>
                {provinces &&
                  provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
              </select>{" "}
              <br />
              <select
                name="district"
                className="tinhthanh"
                onChange={(e) => handleDistrictChange(e.target.value)}
                value={customerInfo.district}
              >
                <option value="">Chọn quận</option>
                {districts.map((district) => (
                  <option key={district.code} value={district.code}>
                    {district.name}
                  </option>
                ))}
              </select>{" "}
              <br />
              <select
                className="tinhthanh"
                name="ward"
                value={customerInfo.ward}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, ward: e.target.value })
                }
              >
                <option value="">Chọn phường</option>
                {wards.map((ward) => (
                  <option key={ward.code} value={ward.name}>
                    {ward.name}
                  </option>
                ))}
              </select>
            </div>
            <label className="muahang-label">
              <input
                type="text"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="muahang-input muahang-sonha"
                placeholder="Số nhà và tên đường"
              />
            </label>{" "}
            <br />
            <label className="muahang-label">
              <input
                type="text"
                name="note"
                value={customerInfo.note}
                onChange={handleInputChange}
                className="muahang-input"
                placeholder="Ghi chú"
              />
            </label>
            <p className="thanhtoan">Hình thức thanh toán tại nhà</p>
          </form>
        </div>
        <div className="muahang-customer-info">
          <div className="hr-xoaydoc"></div>
          <div className="thongtin-sanpham">
            <div className="thongtin-sanpham_2">
              <span className="product-muahang_banner">Giảm {giay.seal}%</span>
              <span className="discount-bannerr">{soLuong}</span>
              <img src={giay.image} className="sanpham-img"></img>
              <span className="sanpham-name">Giày Thời Trang {giay.name} </span>
              <span className="sanpham-price1">${giay.price}</span>{" "}
              <span className="sanpham-price">
                ${(giay.price * ((100 - giay.seal) / 100)).toFixed(2)}
              </span>
            </div>

            <hr></hr>
            <label className="muahang-magiamgia1">
              <input
                type="text"
                name="name"
                className="muahang-magiamhgia"
                placeholder="Mã giảm giá (nếu có)"
              />
              <button className="muahang-xacnhan">Sử Dụng</button>
            </label>
            <hr></hr>

            <div className="muahang-tamtinh">
              {" "}
              <span className="muahang-tamtinh1">Tạm tính</span>
              <span className="muahang-tamtinh3">${tamtinh}</span>{" "}
            </div>

            <div className="muahang-phivanchuyen">
              <span>Phí vận chuyển</span>
              <span className="muahang-phivanchuyen1">$2</span>
            </div>
            <hr></hr>
            <div className="muahang-tongcong">
              <span className="muahang-tongcong2">Tổng cộng</span>
              <span className="muahang-tongcong1">${tamtinh + 2}</span>
            </div>
            <button
              type="button"
              onClick={handleOrder}
              className="muahang-button"
            >
              Đặt Hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuaHangSeal;
