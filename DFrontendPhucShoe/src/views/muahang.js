// MuaHang.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import "../assets/styles/muahang.css"; // Import tệp CSS
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MuaHang = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const giay = state?.giay;
  const soLuong = state?.soLuong;
  const size = state?.size;
  const image = state?.image;
  const [DiachiUsertoBack, setDiachiUsertoBack] = useState("");
  const tienvaSL = giay.GIA * soLuong;
  const Tien = parseFloat(tienvaSL).toFixed(0);
  var so1 = parseFloat(Tien);
  const price1 = so1.toLocaleString();

  const GIA = parseFloat(giay.GIA).toFixed(0);
  var so = parseFloat(GIA);

  const price = so.toLocaleString();

  const tongTien = GIA * soLuong + 30000;
  const Tien2 = parseFloat(tongTien).toFixed(0);
  var so2 = parseFloat(Tien2);
  const KQTongtien = so2.toLocaleString();
  useEffect(() => {
    console.log("check state => ", state);
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phoneNumber: "",

    note: "",
  });
  const [orderTime, setOrderTime] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["name", "phoneNumber", "note"].includes(name)) {
      setCustomerInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const generateRandomCustomerID = () => {
    // Lấy thời gian Unix (milliseconds)
    const randomPart = Math.floor(Math.random() * 100000);
    // Số ngẫu nhiên từ 0 đến 999
    return randomPart;
  };

  const [customerID, setCustomerID] = useState(generateRandomCustomerID());

  const sendDataToBackend = async () => {
    console.log("dia chi =>", DiachiUsertoBack);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/product",
        {
          data: customerInfo,
          dataDiachi: DiachiUsertoBack,
          IdSP: giay.MASP,
          kichCo: size,
          customerID: customerID,
          SoluongDaMua: soLuong,
          Tongtien: tongTien,
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOrder = () => {
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    console.log("Thông tin người dùng:", customerInfo);
    console.log("Thông tin người dùng:", customerInfo.districts);
    console.log(giay.MASP);
    setOrderTime(currentTime);
    console.log("dia chi =>", DiachiUsertoBack);
    const isValidPhoneNumber = /^0\d{9}$/.test(customerInfo.phoneNumber);
    if (!isValidPhoneNumber) {
      toast.error("Số điện thoại không hợp lệ !!!");
    } else {
      if (
        !customerInfo.name ||
        !DiachiUsertoBack ||
        !customerInfo.phoneNumber ||
        customerInfo.phoneNumber.length !== 10
      ) {
        // alert('Vui lòng nhập đầy đủ thông tin');
        toast.error("Vui lòng nhập đầy đủ thông tin!!!");
      } else {
        if (soLuong == 0) {
          console.log(soLuong);
          toast.error("Số lượng đã hết huhu!!!");
        } else {
          // Call the printSelectedValues function to log the selected values
          console.log("currentTime after setOrderTime:", currentTime);
          // Additional logic to send customerInfo to the server or perform other actions
          toast.success("Cảm ơn bạn đã ủng hộ chúng mình");
          sendDataToBackend();
          // Thông báo đặt hàng thành công
          // alert('Cảm ơn bạn đã đặt hàng!' + customerInfo.name + "  " + customerInfo.phoneNumber + "  " + customerInfo.province + "  " + customerInfo.district + "  " + customerInfo.ward + "  " + customerInfo.note);
        }
      }
    }
  };

  // ----------------------------------------API tỉnh thành ----------------------------------------
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null); // Lưu trữ ID của tỉnh được chọn
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null); // Lưu trữ ID của huyện được chọn
  const [wards, setWards] = useState([]);
  const [TinhUser, setTinhUser] = useState(null);
  const [HuyenUser, setHuyenUser] = useState(null);
  const [XaUser, setXaUser] = useState(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://vapi.vnappmob.com/api/province/"
        );
        const data = response.data.results;

        // Xử lý dữ liệu nếu nó là một đối tượng
        // const provincesArray = Object.values(data);
        setProvinces(Array.isArray(data) ? data : []);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Kiểm tra xem tất cả các biến đã được thiết lập hay chưa
    if (TinhUser !== null && HuyenUser !== null && XaUser !== null) {
      console.log("oke !!");
      // Ghép các biến thành một chuỗi và cập nhật DiachiUser
      setDiachiUsertoBack(
        ` xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      );
    }
  }, [TinhUser, HuyenUser, XaUser]);

  useEffect(() => {
    if (selectedProvinceId !== null && selectedProvinceId !== undefined) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${selectedProvinceId}`
          );
          const data = response.data;
          setDistricts(data.results);
          // console.log(data.results);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        // Chỉ gửi yêu cầu khi có ID của huyện được chọn
        if (selectedDistrictId !== null && selectedDistrictId !== undefined) {
          const response = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${selectedDistrictId}`
          );
          const data = response.data;
          setWards(data.results);
          // console.log(data.results);
        }
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };

    fetchWards();
  }, [selectedDistrictId]); // Gọi lại useEffect khi selectedDistrictId thay đổi
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvinceId(provinceId); // Lưu ID của tỉnh được chọn vào state
    const selectedProvinceName =
      event.target.options[event.target.selectedIndex].text; // Lấy tên của tỉnh được chọn
    console.log("tinh", selectedProvinceName);
    setTinhUser(selectedProvinceName); // Lưu dữ liệu của tỉnh vào state
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;

    setSelectedDistrictId(districtId);
    const selectedHuyenName =
      event.target.options[event.target.selectedIndex].text;
    console.log("huyen", selectedHuyenName);
    setHuyenUser(selectedHuyenName);
  };
  const handleChangeXa = (event) => {
    const selectedXaName =
      event.target.options[event.target.selectedIndex].text;
    console.log("xa", selectedXaName);
    setXaUser(selectedXaName);
  };

  // Kiểm tra xem giay có tồn tại không
  if (!giay) {
    // Nếu giay không tồn tại, hiển thị thông báo hoặc chuyển hướng đến một trang khác
    return <div>Không tìm thấy thông tin sản phẩm</div>;
  }

  return (
    <>
      <div className="div-logomuahang">
        {" "}
        <a href="/" id="logophucshoe">
          PhucShoe
        </a>
      </div>

      <div className="muahang-container">
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
                  // value={customerInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="muahang-input muahang-sdt"
                  placeholder="Số điện thoại "
                />
              </label>
              <div className="container-tinhthanhvietnam">
                <select
                  className="tinhthanh"
                  name="province"
                  onChange={handleProvinceChange}
                  // value={customerInfo.provinces}
                >
                  <option value="">Chọn</option>
                  {provinces.map((province) => (
                    <option
                      key={province.province_id}
                      value={province.province_id}
                    >
                      {province.province_name}
                    </option>
                  ))}
                </select>{" "}
                <br />
                <select
                  name="district"
                  className="tinhthanh"
                  onChange={handleDistrictChange}
                  value={customerInfo.district}
                >
                  <option value="">Chọn huyện</option>
                  {Array.isArray(districts) &&
                    districts.map((district) => (
                      <option
                        key={district.district_id}
                        value={district.district_id}
                      >
                        {district.district_name}
                      </option>
                    ))}
                </select>{" "}
                <br />
                <select
                  className="tinhthanh"
                  name="ward"
                  // value={customerInfo.ward}
                  onChange={handleChangeXa}
                >
                  <option value="">Chọn xã</option>
                  {Array.isArray(wards) &&
                    wards.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
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
                <span className="discount-bannerr">{soLuong}</span>
                <img
                  src={`http://localhost:3003/images/${giay.description}`}
                  className="sanpham-img"
                ></img>

                <span className="sanpham-name">
                  Giày Thời Trang {giay.TENSANPHAM}{" "}
                </span>
                <span className="sanpham-price">{price}đ</span>
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
                <span className="muahang-tamtinh1">Tạm tính</span>
                <span className="muahang-tamtinh3">{price1}đ</span>
              </div>
              <div className="muahang-phivanchuyen">
                <span>Phí vận chuyển</span>
                <span className="muahang-phivanchuyen1">30,000đ</span>
              </div>
              <hr></hr>
              <div className="muahang-tongcong">
                <span>Tổng cộng</span>
                <span className="muahang-tongcong1">{KQTongtien}đ</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleOrder();
                  generateRandomCustomerID();
                }}
                className="muahang-button"
              >
                Đặt Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MuaHang;
