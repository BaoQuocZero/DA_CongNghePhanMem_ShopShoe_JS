import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Input } from "@nextui-org/react";

import axios from "axios";
import "../modal/ModalCreateProducts.css";
import { toast } from "react-toastify";

const ModalCreateProducts = ({
  callback,
  modalIsOpen,
  openModal,
  closeModal,
  afterOpenModal,
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const placements = ["inside", "outside", "outside-left"];

  const [modalIsOpenHangGiay, setmodalIsOpenHangGiay] = useState(false);
  const [GetdataHangGiay, setGetdataHangGiay] = useState();
  const [GetdataLoaiGiay, setGetdataLoaiGiay] = useState();
  const [GetdataSizeGiay, setGetdataSizeGiay] = useState();
  const tokenSetStorage = sessionStorage.getItem("accessToken");

  const axiosWithCredentials = axios.create({
    withCredentials: true, // Bật sử dụng cookie trong yêu cầu
    headers: {
      Authorization: `Bearer ${tokenSetStorage}`, // Thay yourToken bằng token của bạn
    },
  });
  function openModal() {
    setmodalIsOpenHangGiay(true);
  }

  function closeModal() {
    setmodalIsOpenHangGiay(false);
  }

  const [DataHangBackend, setDataHangBackend] = useState([]);
  const [DataSizeBackend, setDataSizeBackend] = useState([]);
  const [DataLoaiBackend, setDataLoaiBackend] = useState([]);
  // console.log("=>Hang", DataHangBackend);
  // console.log("=>size", DataSizeBackend);
  // console.log("=>loai", DataLoaiBackend);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DataHang = await axiosWithCredentials.get(
          "http://localhost:3003/api/v1/hang"
        );
        setDataHangBackend(DataHang.data.DT);

        const DataSize = await axiosWithCredentials.get(
          "http://localhost:3003/api/v1/kichco"
        );
        setDataSizeBackend(DataSize.data.DT);
        const DataLoai = await axiosWithCredentials.get(
          "http://localhost:3003/api/v1/loai"
        );
        setDataLoaiBackend(DataLoai.data.DT);

        // console.log("=>Hang", DataHang.data.DT);
        // console.log("=>size", DataSize.data.DT);
        // console.log("=>loai", DataLoai.data.DT);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // const handleRegister = async () => {
  //   try {
  //     const response = await axios.post("http://localhost:3003/v1/Register", {
  //       tendangnhap: tendangnhap,
  //       name: Name,
  //       namsinh: namsinh,
  //       password: password,
  //     });
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const [TengiayShoe, setTengiayShoe] = useState();
  const [HanggiayShoe, setHanggiayShoe] = useState();
  const [GiabanShoe, setGiabanShoe] = useState();
  // const [GiamgiaShoe, setGiamgiaShoe] = useState();
  const [LoaiGiayShoe, setLoaiGiayShoe] = useState();
  const [SizeGiayShoe, setSizeGiayShoe] = useState();
  const [SoLuongShoe, setSoLuongShoe] = useState();
  const [ThongtinShoe, setThongtinShoe] = useState();
  const [inputErrors, setInputErrors] = useState({});
  const handleSubmitProducts = async (event) => {
    event.preventDefault();
    //--- Kiểm tra các trường bắt buộc và thông báo lỗi nếu có
    const errors = {};
    if (!selectedImage) errors.selectedImage = true;
    if (!TengiayShoe) errors.TengiayShoe = true;
    if (!HanggiayShoe) errors.HanggiayShoe = true;
    if (!GiabanShoe || isNaN(GiabanShoe)) errors.GiabanShoe = true;
    // if ((GiamgiaShoe && isNaN(GiamgiaShoe)) || !GiamgiaShoe)
    //   errors.GiamgiaShoe = true;
    if (!LoaiGiayShoe) errors.LoaiGiayShoe = true;
    if (!SizeGiayShoe || isNaN(SizeGiayShoe)) errors.SizeGiayShoe = true;
    if (!SoLuongShoe || isNaN(SoLuongShoe)) errors.SoLuongShoe = true;
    if (!ThongtinShoe) errors.ThongtinShoe = true;

    setInputErrors(errors);
    //---end check điều kiện
    // Nếu có lỗi, thông báo cho người dùng và ngăn gửi form
    if (Object.keys(errors).length > 0) {
      toast.error("Vui lòng nhập đầy đủ và chính xác các thông tin.");
      return;
    }
    if (SoLuongShoe > 200) {
      toast.error("Số lượng giày quá lớn rồi :<");
      return;
    }
    if (GiabanShoe > 10000000) {
      toast.error("Số tiền quá lớn rồi :<");
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("TengiayShoe", TengiayShoe);
    formData.append("HanggiayShoe", HanggiayShoe);
    formData.append("GiabanShoe", GiabanShoe);
    // formData.append("GiamgiaShoe", GiamgiaShoe);
    formData.append("LoaiGiayShoe", LoaiGiayShoe);
    formData.append("SizeGiayShoe", SizeGiayShoe);
    formData.append("SoLuongShoe", SoLuongShoe);
    formData.append("ThongtinShoe", ThongtinShoe);
    try {
      const response = await axiosWithCredentials.post(
        "http://localhost:3003/api/v1/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully:", response.data);
      toast.success("Thêm sản phẩm thành công");

      // ----Reset form and errors
      setSelectedImage(null);
      setTengiayShoe("");
      setHanggiayShoe("");
      setGiabanShoe("");
      // setGiamgiaShoe("");
      setLoaiGiayShoe("");
      setSizeGiayShoe("");
      setSoLuongShoe("");
      setThongtinShoe("");
      setInputErrors({});
      //---------------------

      callback();
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Oh Noo đã xảy ra lỗi O.o");
    }
  };
  const [isOpenHangGiay, setIsOpenHangGiay] = useState(false);
  const [isOpenLoaiGiay, setisOpenLoaiGiay] = useState(false);
  const [isOpenSizeGiay, setisOpenSizeGiay] = useState(false);
  const [DisableInput, setDisableInput] = useState(false);

  const CreateHangGiay = () => {
    setIsOpenHangGiay(!isOpenHangGiay);
    setDisableInput(!DisableInput);
  };
  const XacNhanTaoHangGiay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/hang/create",
        {
          hang: GetdataHangGiay,
        }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const XacNhanTaoLoaiGiay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/loai/create",
        {
          name: GetdataLoaiGiay,
        }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const XacNhanTaoSizeGiay = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/kichco/create",
        {
          giatri: GetdataSizeGiay,
        }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const CreateLoaiGiay = () => {
    setisOpenLoaiGiay(!isOpenLoaiGiay);
    setDisableInput(!DisableInput);
  };
  const CreateSizeGiay = () => {
    setisOpenSizeGiay(!isOpenSizeGiay);
    setDisableInput(!DisableInput);
  };
  const handleFocus = (field) => {
    setInputErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };
  return (
    <div>
      <button onClick={openModal} className=" btn-dark btn">
        Thêm Sản Phẩm
      </button>
      <Modal
        isOpen={modalIsOpenHangGiay}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="exit-modal">
          <i class="fa-regular fa-circle-xmark" onClick={closeModal}></i>
        </div>
        <div className="container-modalRegister">
          <div className="modalRegister">
            <h4>Thêm Sản Phẩm</h4>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Tên giày
              </label>
              <input
                type="text"
                className={`form-control ${
                  inputErrors.TengiayShoe ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="Giày MWC NT85"
                disabled={DisableInput}
                onChange={(event) => setTengiayShoe(event.target.value)}
                onFocus={() => handleFocus("TengiayShoe")}
              />
            </div>
            <div class="input-group mb-3">
              <select
                onFocus={() => handleFocus("HanggiayShoe")}
                className={`form-select ${
                  inputErrors.HanggiayShoe ? "border-danger" : ""
                }`}
                id="inputGroupSelect02"
                disabled={DisableInput}
                onChange={(event) => setHanggiayShoe(event.target.value)} // Di chuyển sự kiện onChange lên đây
              >
                <option selected>Chọn hãng giày</option>
                {DataHangBackend.map((hang) => (
                  <option key={hang.MAHANG} value={hang.MAHANG}>
                    {hang.TENHANG}
                  </option>
                ))}
              </select>

              <label
                class="input-group-text"
                for="inputGroupSelect02"
                onClick={CreateHangGiay}
              >
                Thêm hãng giày
              </label>
            </div>
            {/* -------------------------------THEM HANG GIAY ----------------------------------- */}
            {isOpenHangGiay ? (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  <h4> Thêm hãng giày</h4>
                </label>
                <input
                  type="text"
                  class="form-control mb-2 "
                  id="exampleFormControlInput1"
                  placeholder="MWC"
                  onChange={(event) => setGetdataHangGiay(event.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={XacNhanTaoHangGiay}
                >
                  Thêm hãng giày
                </button>
              </div>
            ) : (
              true
            )}
            {/* -----------------------------END -------------------------------------- */}
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Giá bán giày
              </label>
              <input
                onFocus={() => handleFocus("GiabanShoe")}
                type="number"
                className={`form-control ${
                  inputErrors.GiabanShoe ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="259.000"
                disabled={DisableInput}
                onChange={(event) => setGiabanShoe(event.target.value)}
              />
            </div>
            {/* <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Giảm giá
              </label>
              <input
                onFocus={() => handleFocus("GiamgiaShoe")}
                type="email"
                className={`form-control ${
                  inputErrors.GiamgiaShoe ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="30%"
                disabled={DisableInput}
                onChange={(event) => setGiamgiaShoe(event.target.value)}
              />
            </div> */}
            <div class="input-group mb-3">
              <select
                onFocus={() => handleFocus("LoaiGiayShoe")}
                class={`form-control ${
                  inputErrors.LoaiGiayShoe ? "border-danger" : ""
                }`}
                id="inputGroupSelect02"
                disabled={DisableInput}
                onChange={(event) => setLoaiGiayShoe(event.target.value)}
              >
                <option selected> Chọn loại giày</option>
                {DataLoaiBackend.map((loai) => (
                  <option key={loai.MALOAI} value={loai.MALOAI}>
                    {loai.name}
                  </option>
                ))}
              </select>
              <label
                class="input-group-text"
                for="inputGroupSelect02"
                onClick={CreateLoaiGiay}
              >
                Thêm Loại Giày
              </label>
            </div>
            {/* ------------------------------------THEM LOAI GIAY-------------------------------------- */}
            {isOpenLoaiGiay ? (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  <h4> Thêm loại giày</h4>
                </label>
                <input
                  type="text"
                  class="form-control mb-2"
                  id="exampleFormControlInput1"
                  placeholder="Nam"
                  onChange={(event) => setGetdataLoaiGiay(event.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={XacNhanTaoLoaiGiay}
                >
                  Thêm loại giày
                </button>
              </div>
            ) : (
              true
            )}
            {/* ------------------------------------END-------------------------------------- */}
            <div class="input-group mb-3">
              <select
                class={`form-select ${
                  inputErrors.SizeGiayShoe ? "border-danger" : ""
                }`}
                id="inputGroupSelect02"
                disabled={DisableInput}
                onChange={(event) => setSizeGiayShoe(event.target.value)}
                onFocus={() => handleFocus("SizeGiayShoe")}
              >
                <option selected> Chọn size giày</option>
                {DataSizeBackend.map((size) => (
                  <option key={size.MAGIATRI} value={size.MAGIATRI}>
                    {size.GIATRI}
                  </option>
                ))}
              </select>
              <label
                class="input-group-text"
                for="inputGroupSelect02"
                onClick={CreateSizeGiay}
              >
                Thêm Size Giày
              </label>
            </div>
            {isOpenSizeGiay ? (
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  <h4> Thêm size giày</h4>
                </label>
                <input
                  type="number"
                  class="form-control mb-2"
                  id="exampleFormControlInput1"
                  placeholder="45"
                  onChange={(event) => setGetdataSizeGiay(event.target.value)}
                />
                <button
                  className="btn btn-success"
                  onClick={XacNhanTaoSizeGiay}
                >
                  Thêm size giày
                </button>
              </div>
            ) : (
              true
            )}
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Số lượng giày
              </label>
              <input
                onFocus={() => handleFocus("SoLuongShoe")}
                type="number"
                className={`form-control ${
                  inputErrors.SoLuongShoe ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="100"
                disabled={DisableInput}
                onChange={(event) => setSoLuongShoe(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Thông tin về đôi giày
              </label>
              <textarea
                onFocus={() => handleFocus("ThongtinShoe")}
                disabled={DisableInput}
                className={`form-control ${
                  inputErrors.ThongtinShoe ? "border-danger" : ""
                }`}
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(event) => setThongtinShoe(event.target.value)}
              ></textarea>
            </div>
            <div className="modalRegister-sdt margin5px">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                name="profile_pic"
              />
            </div>
            <div className="modalRegister-sdt margin5px">
              <button
                className="modalRegister-dangky btn btn-success"
                onClick={handleSubmitProducts}
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalCreateProducts;
