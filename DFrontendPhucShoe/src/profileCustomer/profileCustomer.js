import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MyNavbar from "../components/NavbarhomePage";
import axios from "axios";
import "./profileCustomer.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Footer from "../components/foolterHomepage";
import Loading from "../components/ComponentLoading/CompnentLoading.tsx";

import { set } from "date-fns";
import OrderStatus from "./component/OrderStatus.js";
import ListOrdersCustomer from "./profileOrderUser/ListOrdersCustomer.jsx";
import ListOrdersCustomerDaGiao from "./profileOrderUser/ListOrdersCustomerDaGiao.jsx";
import ListOrdersCustomerHuyDon from "./profileOrderUser/ListOrdersCustomerHuyDon.jsx";
const ProfileCustomer = () => {
  const navigate = useNavigate();
  const tokenSetStorage = sessionStorage.getItem("accessToken");

  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  const token = useLocation();
  const { username } = useParams();
  const [IsOpenProfile, setIsOpenProfile] = useState(true);
  const [IsOpenProfilePassword, setIsOpenProfilePassword] = useState(false);
  const [IsOpenLuuThayDoi, setIsOpenLuuThayDoi] = useState(false);
  const [IsOpenDonHang, setIsOpenDonHang] = useState(false);
  const [IsOpenDonHangDaGiao, setIsOpenDonHangDaGiao] = useState(false);
  const [IsOpenDonHangHuyDon, setIsOpenDonHangHuyDon] = useState(false);
  const [selectedItem, setSelectedItem] = useState("profile"); // New state to track selected item
  const [CountCustomer, setCountCustomer] = useState(0);

  // ----------------START THAY ĐỔI MẬT KHẨU-----------------------------------
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  // ----------------END THAY ĐỔI MẬT KHẨU-----------------------------------

  const handleIsOpenProfile = () => {
    setSelectedItem("profile"); // Set selected item
    setIsOpenProfile(true);
    setIsOpenProfilePassword(false);
    setIsOpenDonHang(false);
    setIsOpenDonHangHuyDon(false);
    setIsOpenDonHangDaGiao(false);
    setCountCustomer(0);
  };

  const handleIsOpenProfilePassword = () => {
    setSelectedItem("password"); // Set selected item
    setIsOpenProfile(false);
    setIsOpenDonHang(false);
    setIsOpenDonHangHuyDon(false);
    setIsOpenDonHangDaGiao(false);
    setIsOpenProfilePassword(true);
    setCountCustomer(0);
  };

  const handleIsOpenDonHang = () => {
    setCountCustomer(0);
    setSelectedItem("orders"); // Set selected item
    setIsOpenProfile(false);
    setIsOpenProfilePassword(false);
    setIsOpenDonHangHuyDon(false);
    setIsOpenDonHangDaGiao(false);
    setIsOpenDonHang(true);
  };

  const handleIsOpenDonHangDaGiao = () => {
    setSelectedItem("delivered"); // Set selected item
    setIsOpenProfile(false);
    setIsOpenProfilePassword(false);
    setIsOpenDonHangHuyDon(false);
    setIsOpenDonHangDaGiao(true);
    setIsOpenDonHang(false);
    setCountCustomer(0);
  };

  const handleIsOpenDonHangHuyDon = () => {
    setSelectedItem("canceled"); // Set selected item
    setIsOpenProfile(false);
    setIsOpenProfilePassword(false);
    setIsOpenDonHangHuyDon(true);
    setIsOpenDonHangDaGiao(false);
    setIsOpenDonHang(false);
    setCountCustomer(CountCustomer + 1);
    console.log(CountCustomer);
    if (CountCustomer == 2) {
      toast.success("Double Click Hủy Đơn (* ^ ω ^)");
    }
    if (CountCustomer == 3) {
      toast.success("Triple Click Hủy Đơn (⌒ω⌒)");
    }
    if (CountCustomer == 4) {
      toast.info("Quatalill Click Hủy Đơn ╰(▔∀▔)╯");
    }
    if (CountCustomer == 5) {
      toast.warning("Pentakill Click Hủy Đơn (─‿‿─)");
    }
    if (CountCustomer == 6) {
      toast.warning("Super Click Hủy Đơn -_-");
    }
    if (CountCustomer == 7) {
      toast.warning("SuperGod Click Hủy Đơn -_-!");
    }
    if (CountCustomer == 8) {
      toast.error("SuperBlue Click Hủy Đơn (o_O)");
    }
    if (CountCustomer == 9) {
      toast.error("SuperUltra Click Hủy Đơn (□_□)");
    }
    if (CountCustomer == 10) {
      toast.error("Waoooo SuperUltra Click Hủy Đơn 	Σ(O_O)");
    }
    if (CountCustomer > 10) {
      toast.error(
        "Waoooo SuperUltra Click Hủy Đơn " +
          " " +
          " (°ロ°)!" +
          " x" +
          CountCustomer
      );
    }
    if (CountCustomer === 25) {
      toast.error(
        "Mày muốn phá website tao à? " + " " + " (°ロ°)!" + " x" + CountCustomer
      );
    }
    if (CountCustomer === 40) {
      toast.error(
        "Mày muốn phá website tao à? " + " " + " (°ロ°)!" + " x" + CountCustomer
      );
      navigate("/");
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileUser, setprofileUser] = useState();
  const [TenUser, setTenUser] = useState("");
  const [PhoneUser, setPhoneUser] = useState("");
  const [DiachiUser, setDiachiUser] = useState("");
  const [DiachiUsertoBack, setDiachiUsertoBack] = useState("");
  const [Xa, setXa] = useState("");
  const [Huyen, setHuyen] = useState("");
  const [Tinh, setTinh] = useState("");
  const [Ap, setAp] = useState("");
  // console.log(Tinh);
  console.log(Xa);
  // Tách các thành phần từ chuỗi

  // console.log(username);
  console.log(profileUser);

  console.log(TenUser);

  console.log(PhoneUser);

  useEffect(() => {
    if (profileUser && profileUser.length > 0) {
      const { TEN, DIACHI, SODIENTHOAI } = profileUser[0];
      setTenUser(TEN);
      setDiachiUser(DIACHI);
      setPhoneUser(SODIENTHOAI);
      // console.log(DIACHI);
    }
  }, [profileUser]);

  const [provinces, setProvinces] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null); // Lưu trữ ID của tỉnh được chọn
  const [districts, setDistricts] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null); // Lưu trữ ID của huyện được chọn
  const [wards, setWards] = useState([]);
  const [TinhUser, setTinhUser] = useState(null);
  const [HuyenUser, setHuyenUser] = useState(null);
  const [XaUser, setXaUser] = useState(null);
  const [ApUser, setApUser] = useState(null);
  const [ImgAvatar, setImgAvatar] = useState(null);
  // console.log(provinces);

  //----------------api Tỉnh----------------------
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    // Kiểm tra xem tất cả các biến đã được thiết lập hay chưa
    if (
      TinhUser !== null &&
      HuyenUser !== null &&
      XaUser !== null &&
      ApUser !== null
    ) {
      // Ghép các biến thành một chuỗi và cập nhật DiachiUser
      // setDiachiUsertoBack(
      //   `${ApUser}, xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      // );
      setDiachiUsertoBack(`${ApUser},  ${XaUser},  ${HuyenUser},  ${TinhUser}`);
    }
  }, [TinhUser, HuyenUser, XaUser, ApUser]);
  //------------------------api huyện---------------------------------
  useEffect(() => {
    if (selectedProvinceId !== null && selectedProvinceId !== undefined) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${selectedProvinceId}`
          );
          const data = response.data;
          setDistricts(data.results);
          console.log(data.results);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedProvinceId]);
  // Gọi lại useEffect khi selectedProvinceId thay đổi
  //------------------------api xã---------------------------------
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

  // Hàm này được gọi khi chọn một tỉnh cụ thể
  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    setSelectedProvinceId(provinceId); // Lưu ID của tỉnh được chọn vào state
    const selectedProvinceName =
      event.target.options[event.target.selectedIndex].text; // Lấy tên của tỉnh được chọn
    setTinhUser(selectedProvinceName); // Lưu dữ liệu của tỉnh vào state
  };
  // console.log(TinhUser);
  // console.log(HuyenUser);
  // console.log(XaUser);
  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrictId(districtId);
    const selectedHuyenName =
      event.target.options[event.target.selectedIndex].text;
    setHuyenUser(selectedHuyenName);
  };
  const handleChangeXa = (event) => {
    const selectedXaName =
      event.target.options[event.target.selectedIndex].text;
    setXaUser(selectedXaName);
  };

  //--------------------start api get user------------------------
  useEffect(() => {
    fetchAvatarCustomer();
  }, []);
  const fetchAvatarCustomer = async () => {
    try {
      const DataHang = await axiosWithCredentials.get(
        `http://localhost:3003/api/v1/user/info/${username}`
      );
      setprofileUser(DataHang.data.DT.results);

      setImgAvatar(DataHang.data.DT.results[0].avatar);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //--------------------end api get user------------------------
  console.log(Xa);
  useEffect(() => {
    // Tách các thành phần từ chuỗi
    if (profileUser) {
      const parts = DiachiUser ? DiachiUser.split(", ") : [];

      setXaUser(parts[1]);
      setHuyenUser(parts[2]);
      setTinhUser(parts[3]);
      setApUser(parts[0]);

      // ---------DÀNH CHO API ----------
      // setXa(parts[1]);
      // setHuyen(parts[2]);
      // setTinh(parts[3]);
      // setApUser(parts[0]);
    }
  }, [profileUser]);

  //----------------------end api tỉnh --------------------------------
  const validateVietnamPhoneNumber = (phoneNumber) => {
    const vietnamPhoneRegex = /^(03|05|07|08|09)\d{8}$/;
    return vietnamPhoneRegex.test(phoneNumber);
  };
  const handleUpdateProfileUser = async (event) => {
    event.preventDefault();
    if (PhoneUser.length != 10) {
      toast.error("Số điện thoại phải 10 chữ số !");
      return;
    }
    if (!validateVietnamPhoneNumber(PhoneUser)) {
      toast.error(
        "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam!"
      );
      return;
    }
    console.log("ádas=>", DiachiUsertoBack);
    console.log("ten", TenUser);
    console.log("ten", PhoneUser);
    console.log(username);
    if (TenUser && DiachiUsertoBack && PhoneUser) {
      try {
        const response = await axiosWithCredentials.put(
          `http://localhost:3003/api/v1/user/info/update/${username}`,
          {
            ten: TenUser,
            diachi: DiachiUsertoBack,
            sodienthoai: PhoneUser,
          }
        );
        console.log("update success", response.data);
        fetchAvatarCustomer();
        toast.success("Cập nhật thông tin thành công !!!");
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      toast.error("Update Thông Tin Thất Bại");
    }
  };

  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clean token to ensure no spaces or invalid characters
        const cleanedAuth = tokenSetStorage ? tokenSetStorage.trim() : "";
        console.log("Cleaned Auth token:", cleanedAuth); // Log cleaned token

        const response = await axios.get(
          "http://localhost:3003/api/v1/protected",
          {
            headers: { Authorization: `Bearer ${cleanedAuth}` },
          }
        );

        console.log("API response:", response.data); // Log API response

        if (
          response.data.message === "Protected data" &&
          !response.data.user.role
        ) {
          setRedirect(false);
          console.log("Oke");
        } else {
          setRedirect(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setRedirect(true);
        } else {
          console.error("Error fetching protected data:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenSetStorage]);

  // ------------------------API ĐƠN HÀNG USER--------------------------
  const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
  const fetchData = async () => {
    console.log(username);
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/donhangchuagiaokhachhang",
        {
          taikhoan: username,
        }
      );
      setListOdersChuaGiao(response.data.DT);
      console.log("check data Donhang =>", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // ---Thích thì xóa------
  // useEffect(() => {
  //   // Logic để tải dữ liệu, có thể sử dụng setTimeout để mô phỏng
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000); // Giả định dữ liệu sẽ được tải trong 2 giây
  // }, []);
  // ---Thích thì xóa------
  if (loading) {
    return <Loading />; // Render component Loading trong khi dữ liệu đang được tải
  }

  const handleFileChange = async (event) => {
    setIsOpenLuuThayDoi(true);
    setSelectedFile(event.target.files[0]);
    // console.log(selectedFile.name);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile); // Sửa "file" thành "image" để phù hợp với tên trường của Multer

      await axiosWithCredentials.put(
        `http://localhost:3003/api/v1/user/info/update/avatar/${username}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully!");
      fetchAvatarCustomer();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  // ----------------------THAY ĐỔI MẬT KHẨU-------------------------------

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    if (username == "") {
      toast.error("Hệ thống không lấy được Username ");
      return;
    }
    if (newPassword == "" || confirmNewPassword == "") {
      toast.error("Các Mật khẩu không được rỗng");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    try {
      const response = await axiosWithCredentials.put(
        `http://localhost:3003/api/v1/user/info/update/password/${username}`,
        {
          passwordcu: currentPassword,
          passwordmoi: newPassword,
        }
      );

      if (response.data.EC === 0) {
        toast.success("Mật khẩu đã được cập nhật thành công");
      } else {
        toast.success(response.data.EM);
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật mật khẩu");
    }
  };
  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <MyNavbar />
      <div className="container-profileCustomer">
        <div className="profileCustomer-functions">
          <div className="profileCustomer-functions-wrap">
            {" "}
            <div className="functions-name">
              <p>{TenUser}</p>
            </div>
            <div className="functions-br-ngang">
              <div className="functions-br-ngang1"></div>
            </div>
            <div
              className={`functions-thongtincanhan ${
                selectedItem === "profile" ? "active" : ""
              }`}
              onClick={handleIsOpenProfile}
            >
              <p>Thông tin cá nhân</p>
            </div>
            <div
              className={`functions-thongtincanhan ${
                selectedItem === "password" ? "active" : ""
              }`}
              onClick={handleIsOpenProfilePassword}
            >
              <p>Thay đổi mật khẩu</p>
            </div>
            <div
              className={`functions-thongtincanhan ${
                selectedItem === "orders" ? "active" : ""
              }`}
              onClick={handleIsOpenDonHang}
            >
              <p>Xem đơn hàng</p>
            </div>
            <div
              className={`functions-thongtincanhan ${
                selectedItem === "delivered" ? "active" : ""
              }`}
              onClick={handleIsOpenDonHangDaGiao}
            >
              <p>Đơn hàng đã giao</p>
            </div>
            <div
              className={`functions-thongtincanhan ${
                selectedItem === "canceled" ? "active" : ""
              }`}
              onClick={handleIsOpenDonHangHuyDon}
            >
              <p>Đơn hàng đã hủy</p>
            </div>
          </div>
        </div>
        <div className="br-doc"></div>
        {IsOpenProfile ? (
          <div className="profileCustomer-information">
            <div className="information-name">
              {" "}
              <p>Thông tin cá nhân</p>
            </div>
            <div className="information-br">
              {" "}
              <div className="br"></div>
            </div>
            <div className="information-data">
              {" "}
              <div className="information-data-row mt-3">
                <div className="row">
                  <div class="col displayflex">
                    {" "}
                    <form className="form-infomation">
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Tên tài khoản
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={username}
                          disabled
                        />
                        <div id="emailHelp" class="form-text">
                          Vd: phucdeptrai
                        </div>
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputPassword1"
                          value={TenUser}
                          onChange={(event) => setTenUser(event.target.value)}
                        />{" "}
                        <div id="emailHelp" class="form-text">
                          Vd: Hồ Hoàng Phúc
                        </div>
                      </div>
                      {/* ---------------START--------API TỈNH--------------- */}
                      {/* <div>
                        <label htmlFor="provinceSelect">Chọn tỉnh:</label>
                        <select
                          id="provinceSelect"
                          class="form-select"
                          aria-label="Default select example"
                          onChange={handleProvinceChange}
                        >
                          <option value={Tinh}>{Tinh}</option>
                          {provinces.map((province) => (
                            <option
                              key={province.province_id}
                              value={province.province_id}
                            >
                              {province.province_name}
                            </option>
                          ))}
                        </select>

                        <label htmlFor="districtSelect">Chọn huyện:</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          id="districtSelect"
                          onChange={handleDistrictChange}
                        >
                          <option value={Huyen}>{Huyen}</option>
                          {Array.isArray(districts) &&
                            districts.map((district) => (
                              <option
                                key={district.district_id}
                                value={district.district_id}
                              >
                                {district.district_name}
                              </option>
                            ))}
                        </select>
                        <label htmlFor="wardSelect">Chọn xã:</label>
                        <select
                          id="wardSelect"
                          class="form-select"
                          aria-label="Default select example"
                          onChange={handleChangeXa}
                        >
                          <option value={Xa}>{Xa}</option>
                          {Array.isArray(wards) &&
                            wards.map((ward) => (
                              <option key={ward.ward_id} value={ward.ward_id}>
                                {ward.ward_name}
                              </option>
                            ))}
                        </select>
                      </div> */}
                      {/* ----------------END--------API TỈNH---------------    */}
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Hãy nhập địa chỉ của bạn
                        </label>
                        <input
                          placeholder="Tỉnh"
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={TinhUser}
                          onChange={(event) => setTinhUser(event.target.value)}
                        />
                        <div id="emailHelp" class="form-text">
                          Vd: Số nhà 18, Đường Điện Biên Phủ
                        </div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Hãy nhập huyện của bạn
                        </label>
                        <input
                          placeholder="Huyện"
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={HuyenUser}
                          onChange={(event) => setHuyenUser(event.target.value)}
                        />
                        <div id="emailHelp" class="form-text">
                          Vd: Số nhà 18, Đường Điện Biên Phủ
                        </div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Hãy nhập xã của bạn
                        </label>
                        <input
                          placeholder="Xã"
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={XaUser}
                          onChange={(event) => setXaUser(event.target.value)}
                        />
                        <div id="emailHelp" class="form-text">
                          Vd: Số nhà 18, Đường Điện Biên Phủ
                        </div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Số nhà
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={ApUser}
                          onChange={(event) => setApUser(event.target.value)}
                        />
                        <div id="emailHelp" class="form-text">
                          Vd: Số nhà 18, Đường Điện Biên Phủ
                        </div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Số điện thoại
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={PhoneUser}
                          onChange={(event) => setPhoneUser(event.target.value)}
                        />
                        <div id="emailHelp" class="form-text">
                          Vd:0327434822
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-dark mt-3"
                        onClick={handleUpdateProfileUser}
                      >
                        Cập nhật thông tin
                      </button>
                    </form>
                    <div className="container-avatar">
                      <div className="avatar-wrap">
                        <img
                          className="avatarUser"
                          src={`http://localhost:3003/images/${ImgAvatar}`}
                          alt="Avatar"
                        />

                        {/* {selectedFile && (
                          <img
                            className="avatarUser"
                            src={SelectedImageAvataFake}
                            alt="Avatar Preview"
                          />
                        )} */}
                        <label
                          htmlFor="avatarInput"
                          className="custom-file-upload"
                        >
                          Chọn file ảnh
                        </label>
                        <input
                          id="avatarInput"
                          className="input-avt"
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }} // Ẩn input type="file"
                        />

                        {IsOpenLuuThayDoi && (
                          <button
                            onClick={handleFileUpload}
                            className="btn btn-dark btn-upload"
                          >
                            Lưu thay đổi
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div class="col-12"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}

        {IsOpenProfilePassword ? (
          <div className="profileCustomer-information">
            <div className="information-name">
              <p>Thay đổi mật khẩu</p>
            </div>
            <div className="information-br">
              <div className="br"></div>
            </div>
            <div className="information-data">
              <div className="information-data-row mt-3">
                <div className="row">
                  <div className="col">
                    <form onSubmit={handleUpdatePassword}>
                      <div className="mb-12">
                        <label htmlFor="username" className="form-label">
                          Tên tài khoản
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          value={username}
                          disabled
                        />
                      </div>

                      <div className="mb-12">
                        <label htmlFor="currentPassword" className="form-label">
                          Mật khẩu hiện tại
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-12">
                        <label htmlFor="newPassword" className="form-label">
                          Mật khẩu mới
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-12">
                        <label
                          htmlFor="confirmNewPassword"
                          className="form-label"
                        >
                          Nhập lại mật khẩu mới
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmNewPassword"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        />
                      </div>

                      {message && (
                        <div className="alert alert-info">{message}</div>
                      )}

                      <button type="submit" className="btn btn-primary mt-2">
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="col-12"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          false
        )}

        {/* ------------------------------------------------------------ */}
        {IsOpenDonHang ? (
          <div className="profileCustomer-information">
            <div className="information-name">
              {" "}
              <p>Xem Đơn Hàng</p>
            </div>
            <div className="information-br">
              {" "}
              <div className="br"></div>
            </div>

            <div className="OrderStatus-container">
              {" "}
              {/* <OrderStatus /> */}
              <ListOrdersCustomer />
            </div>
          </div>
        ) : (
          false
        )}
        {IsOpenDonHangHuyDon ? (
          <div className="profileCustomer-information">
            <div className="information-name">
              {" "}
              <p>Xem Đơn Hàng Đã Bị Hủy</p>
            </div>
            <div className="information-br">
              {" "}
              <div className="br"></div>
            </div>

            <div className="OrderStatus-container">
              {" "}
              {/* <OrderStatus /> */}
              <ListOrdersCustomerHuyDon />
            </div>
          </div>
        ) : (
          false
        )}
        {IsOpenDonHangDaGiao ? (
          <div className="profileCustomer-information">
            <div className="information-name">
              {" "}
              <p>Xem Đơn Hàng Đã Giao</p>
            </div>
            <div className="information-br">
              {" "}
              <div className="br"></div>
            </div>

            <div className="OrderStatus-container">
              {" "}
              {/* <OrderStatus /> */}
              <ListOrdersCustomerDaGiao />
            </div>
          </div>
        ) : (
          false
        )}
      </div>

      {/* <Footer></Footer> */}
    </>
  );
};
export default ProfileCustomer;
