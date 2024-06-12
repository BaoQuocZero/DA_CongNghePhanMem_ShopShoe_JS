// MuaHang.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import "../assets/styles/muahang.css"; // Import tệp CSS
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoadingComponent from "../components/ComponentLoading/CompnentLoading.tsx";
import { faL } from "@fortawesome/free-solid-svg-icons";
const MuaHang = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // State variables
  const [giay, setGiay] = useState(null);
  const [soLuong, setSoLuong] = useState(0);
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [price1, setPrice1] = useState(0);
  const [price, setPrice] = useState(0);
  const [KQTongtien, setKQTongtien] = useState(0);
  const [descriptionGiay, setdescriptionGiay] = useState(null);
  const [TENSANPHAM, setTENSANPHAM] = useState(null);
  const [TienHienThi, setTienHienThi] = useState(null);
  const [Tongtienguixuongbackend, setTongtienguixuongbackend] = useState(null);
  const [giamgia, setgiamgia] = useState(null);
  // useEffect to fetch data and update state
  useEffect(() => {
    if (state) {
      setGiay(state.giay);
      setSoLuong(state.soLuong);
      setSize(state.size);
      setImage(state.image);
    }
  }, [state]);

  // useEffect to calculate derived state
  useEffect(() => {
    if (giay) {
      setgiamgia(giay.giamgia);
      console.log(giamgia);

      const GIA = parseFloat(giay.GIA).toFixed(0);
      const TongSotienDaGiamGia = GIA - (GIA / 100) * giay.giamgia;
      const tongTien = parseFloat(TongSotienDaGiamGia) * soLuong + 30000;
      const tienvaSL = TongSotienDaGiamGia * soLuong;
      setTongtienguixuongbackend(tongTien);
      setdescriptionGiay(giay.description);
      setTENSANPHAM(giay.TENSANPHAM);

      setPrice1(parseFloat(tienvaSL).toLocaleString());

      setPrice(parseFloat(TongSotienDaGiamGia).toLocaleString());
      setKQTongtien(price);
      setTienHienThi(
        parseFloat(tongTien)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      console.log("check", price);
    }
  }, [giay, soLuong]);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null); // Lưu trữ ID của tỉnh được chọn
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null); // Lưu trữ ID của huyện được chọn
  const [wards, setWards] = useState([]);
  const [TinhUser, setTinhUser] = useState(null);
  const [HuyenUser, setHuyenUser] = useState(null);
  const [XaUser, setXaUser] = useState(null);
  const [username, setdecodedTokenUsername] = useState(null);
  const [Token, setToken] = useState(null);
  const [IsOpenContractCustomer, setIsOpenContractCustomer] = useState(false);
  const [profileUser, setprofileUser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!giay) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [giay]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setdecodedTokenUsername(decoded.taikhoan);
        setIsOpenContractCustomer(true);
        setToken(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);
  const [DiachiUsertoBack, setDiachiUsertoBack] = useState(null);
  const [name, setname] = useState(null);
  const [phoneNumber, setphoneNumber] = useState(null);
  const [note, setnote] = useState(null);
  const [orderTime, setOrderTime] = useState(null);
  const [DiachiUser, setDiachiUser] = useState(null);
  const [ApUser, setApUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem tất cả các biến đã được thiết lập hay chưa
    if (
      TinhUser !== null &&
      HuyenUser !== null &&
      XaUser !== null &&
      ApUser !== null
    ) {
      // Ghép các biến thành một chuỗi và cập nhật DiachiUser
      setDiachiUsertoBack(
        `${ApUser}, xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      );
    }
  }, [TinhUser, HuyenUser, XaUser, ApUser]);

  useEffect(() => {
    if (profileUser && profileUser.length > 0) {
      const { TEN, DIACHI, SODIENTHOAI } = profileUser[0];
      setname(TEN);
      setDiachiUser(DIACHI);
      setphoneNumber(SODIENTHOAI);

      if (profileUser) {
        const parts = DiachiUser ? DiachiUser.split(", ") : [];

        // Gán giá trị vào các state
        setXaUser(parts[1]);
        setHuyenUser(parts[2]);
        setTinhUser(parts[3]);
        setApUser(parts[0]);
      }

      // console.log(DIACHI);
    }
  }, [profileUser]);

  const generateRandomCustomerID = () => {
    // Lấy thời gian Unix (milliseconds)
    const randomPart = Math.floor(Math.random() * 100000);
    // Số ngẫu nhiên từ 0 đến 999
    return randomPart;
  };

  const [customerID, setCustomerID] = useState(generateRandomCustomerID());

  const sendDataToBackend = async () => {
    console.log("dia chi =>", DiachiUsertoBack);
    console.log("usernmae =>", username);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/productt",
        {
          username: username,
          name: name,
          phoneNumber: phoneNumber,
          note: note,
          dataDiachi: DiachiUsertoBack,
          IdSP: giay.MASP,
          kichCo: size,
          customerID: customerID,
          SoluongDaMua: soLuong,
          Tongtien: Tongtienguixuongbackend,
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOrder = () => {
    const currentTime = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    console.log(giay.MASP);
    setOrderTime(currentTime);
    console.log("dia chi =>", DiachiUsertoBack);
    const isValidPhoneNumber = /^0\d{9}$/.test(phoneNumber);
    if (!isValidPhoneNumber) {
      toast.error("Số điện thoại không hợp lệ !!!");
    } else {
      if (
        !name ||
        !DiachiUsertoBack ||
        !phoneNumber ||
        phoneNumber.length !== 10
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

          toast.success("Cảm ơn bạn đã ủng hộ chúng mình");
          sendDataToBackend();
          // Thông báo đặt hàng thành công
        }
      }
    }
  };

  // ----------------------------------------API tỉnh thành ----------------------------------------

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

  const handleClickChecked = async () => {
    setIsChecked(!isChecked);
    console.log("checked", isChecked);
    if (!isChecked) {
      fetchAvatarCustomer();
      setTimeout(() => {
        fetchAvatarCustomer();
      }, 1000);
    } else {
      toast.success("Thêm dữ liệu thành công !!");
    }
  };
  const fetchAvatarCustomer = async () => {
    try {
      const axiosWithCredentials = axios.create({
        withCredentials: true, // Bật sử dụng cookie trong yêu cầu
        headers: {
          Authorization: `Bearer ${Token}`, // Thay yourToken bằng token của bạn
        },
      });
      const DataHang = await axiosWithCredentials.get(
        `http://localhost:3003/api/v1/user/info/${username}`
      );
      setprofileUser(DataHang.data.DT.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  if (Loading) {
    return <LoadingComponent />;
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
                  value={name}
                  onChange={(event) => setname(event.target.value)}
                  className="muahang-input hoten"
                  placeholder="Họ và tên"
                />
              </label>{" "}
              <br />
              <label className="muahang-label">
                <input
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(event) => setphoneNumber(event.target.value)}
                  className="muahang-input muahang-sdt"
                  placeholder="Số điện thoại "
                />
              </label>
              {/* --------START-----API-------------------------- */}
              {/* <div className="container-tinhthanhvietnam">
                <select
                  className="tinhthanh"
                  name="province"
                  onChange={handleProvinceChange}
                  value={TinhUser}
                >
                  <option value={TinhUser}>
                    {" "}
                    {TinhUser ? TinhUser : "Chọn tỉnh"}
                  </option>
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
                  value={HuyenUser}
                >
                  <option value={HuyenUser}>
                    {HuyenUser ? HuyenUser : "Chọn huyện"}
                  </option>
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
                  value={XaUser}
                  onChange={handleChangeXa}
                >
                  <option value={XaUser}>{XaUser ? XaUser : "Chọn xã"}</option>
                  {Array.isArray(wards) &&
                    wards.map((ward) => (
                      <option key={ward.ward_id} value={ward.ward_id}>
                        {ward.ward_name}
                      </option>
                    ))}
                </select>
              </div> */}
              {/* --------END-----API---------------------------- */}
              <div class="mb-12">
                <input
                  placeholder="Tỉnh"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={TinhUser}
                  onChange={(event) => setTinhUser(event.target.value)}
                />
              </div>
              <div class="mb-12">
                <input
                  placeholder="Huyện"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={HuyenUser}
                  onChange={(event) => setHuyenUser(event.target.value)}
                />
              </div>
              <div class="mb-12">
                <input
                  placeholder="Xã"
                  type="text"
                  class="tinhthanh"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={XaUser}
                  onChange={(event) => setXaUser(event.target.value)}
                />
              </div>
              <label className="muahang-label">
                <input
                  type="text"
                  name="address"
                  value={ApUser}
                  onChange={(event) => setApUser(event.target.value)}
                  className="muahang-input muahang-sonha"
                  placeholder="Số nhà và tên đường"
                />
              </label>
              <br />
              <label className="muahang-label">
                <input
                  type="text"
                  name="note"
                  value={note}
                  onChange={(event) => setnote(event.target.value)}
                  className="muahang-input"
                  placeholder="Ghi chú"
                />
              </label>
              <p className="thanhtoan">Hình thức thanh toán tại nhà</p>
              {IsOpenContractCustomer && (
                <div className="form-muahang-hoso">
                  <p>Bạn có muốn sử dụng thông tin trong hồ sơ để mua hàng?</p>{" "}
                  <div class="form-check">
                    <label class="form-check-label">Hãy bật tắt nó</label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="check1"
                      name="option1"
                      value="something"
                      onClick={handleClickChecked}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="muahang-customer-info">
            <div className="hr-xoaydoc"></div>
            <div className="thongtin-sanpham">
              <div className="thongtin-sanpham_2">
                <span className="discount-bannerr">{soLuong}</span>
                <img
                  src={`http://localhost:3003/images/${descriptionGiay}`}
                  className="sanpham-img"
                ></img>

                <span className="sanpham-name">
                  Giày Thời Trang {TENSANPHAM}{" "}
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
                <span className="muahang-tongcong1">{TienHienThi}đ</span>
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
