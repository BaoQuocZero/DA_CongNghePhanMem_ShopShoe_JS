import React, { useState, useEffect } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import MyNavbar from "../components/NavbarhomePage";
import axios from "axios";
import "./profileCustomer.css";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Footer from "../components/foolterHomepage";
import Loading from "../components/ComponentLoading/CompnentLoading.tsx";

import { set } from "date-fns";
import OrderStatus from "./component/OrderStatus.js";
const ProfileCustomer = () => {
  const tokenSetStorage = sessionStorage.getItem("accessToken");
  const token = useLocation();

  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  const { username } = useParams();
  const [IsOpenProfile, setIsOpenProfile] = useState(true);
  const [IsOpenProfilePassword, setIsOpenProfilePassword] = useState(false);
  const [IsOpenLuuThayDoi, setIsOpenLuuThayDoi] = useState(false);
  const [IsOpenDonHang, setIsOpenDonHang] = useState(false);
  const handleIsOpenProfile = () => {
    setIsOpenProfile(true);
    setIsOpenProfilePassword(false);
    setIsOpenDonHang(false);
  };
  const handleIsOpenProfilePassword = () => {
    setIsOpenProfile(false);
    setIsOpenDonHang(false);
    setIsOpenProfilePassword(true);
  };
  const handleIsOpenDonHang = () => {
    setIsOpenProfile(false);
    setIsOpenProfilePassword(false);
    setIsOpenDonHang(true);
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
      setDiachiUsertoBack(
        `${ApUser}, xã ${XaUser}, huyện ${HuyenUser}, tỉnh ${TinhUser}`
      );
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
    const fetchData = async () => {
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

    fetchData();
  }, []);

  //--------------------end api get user------------------------
  console.log(Xa);
  useEffect(() => {
    // Tách các thành phần từ chuỗi
    if (profileUser) {
      const parts = DiachiUser ? DiachiUser.split(", ") : [];

      // Gán giá trị vào các state
      setXa(parts[1]);
      setHuyen(parts[2]);
      setTinh(parts[3]);
      setApUser(parts[0]);
    }
  }, [profileUser]);

  //----------------------end api tỉnh --------------------------------

  const handleUpdateProfileUser = async (event) => {
    event.preventDefault();
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
  // const handleUpdatePassword = () => {};

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
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
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
              className="functions-thongtincanhan"
              onClick={handleIsOpenProfile}
            >
              <p>Thông tin cá nhân</p>
            </div>
            <div
              className="functions-thongtincanhan"
              onClick={handleIsOpenProfilePassword}
            >
              <p>Thay đổi mật khẩu</p>
            </div>
            <div
              className="functions-thongtincanhan"
              onClick={handleIsOpenDonHang}
            >
              <p>Xem đơn hàng</p>
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

                      <div>
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
              {" "}
              <p>Thay đổi mật khẩu</p>
            </div>
            <div className="information-br">
              {" "}
              <div className="br"></div>
            </div>
            <div className="information-data">
              {" "}
              <div className="information-data-row mt-3">
                <div className="row">
                  <div class="col">
                    {" "}
                    <form>
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
                          Vd: toiyeuem
                        </div>
                      </div>

                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Mật khẩu
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" class="form-text"></div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Mật khẩu Mới
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" class="form-text"></div>
                      </div>
                      <div class="mb-12">
                        <label for="exampleInputEmail1" class="form-label">
                          Nhập Lại Mật Khẩu Mới
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={handleFileChange}
                        />
                        <div id="emailHelp" class="form-text"></div>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Update
                      </button>
                    </form>
                  </div>
                  <div class="col-12"></div>
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
              <OrderStatus />
            </div>
          </div>
        ) : (
          false
        )}
      </div>

      <Footer></Footer>
    </>
  );
};
export default ProfileCustomer;
