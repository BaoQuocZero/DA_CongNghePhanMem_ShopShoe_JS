import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Modal from "react-modal";
import { fCurrency } from '../../utils/format-number';
import axios from "axios";
import Label from '../../components/label';
import { ColorPreview } from '../../components/color-utils';
import "./product-card.css"
import { toast } from "react-toastify";
// ----------------------------------------------------------------------

export default function ShopProductCard({ product, callback }) {


  const [GetdataHangGiay, setGetdataHangGiay] = useState();
  const [GetdataLoaiGiay, setGetdataLoaiGiay] = useState();
  const [GetdataSizeGiay, setGetdataSizeGiay] = useState();
  const [DataHangBackend, setDataHangBackend] = useState([]);
  const [DataSizeBackend, setDataSizeBackend] = useState([]);
  const [DataLoaiBackend, setDataLoaiBackend] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DataHang = await axios.get("http://localhost:3003/api/v1/hang");
        setDataHangBackend(DataHang.data.DT);

        const DataSize = await axios.get("http://localhost:3003/api/v1/kichco");
        setDataSizeBackend(DataSize.data.DT);
        const DataLoai = await axios.get("http://localhost:3003/api/v1/loai");
        setDataLoaiBackend(DataLoai.data.DT);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const imageDefaulf = product.description
  const [selectedImage, setSelectedImage] = useState(imageDefaulf);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);


  };
  const TengiayShoefake = product.TENSANPHAM
  const HanggiayShoefake = product.MAHANG
  const GiabanShoefake = product.GIA
  // const GiamgiaShoefake = product.giamgia
  const LoaiGiayShoefake = product.MALOAI
  const SizeGiayShoefake = product.MAGIATRI
  const SoLuongShoefake = product.SOLUONG
  const ThongtinShoefake = product.THONGTINSANPHAM

  const [TengiayShoe, setTengiayShoe] = useState(TengiayShoefake);
  const [HanggiayShoe, setHanggiayShoe] = useState(HanggiayShoefake);
  const [GiabanShoe, setGiabanShoe] = useState(GiabanShoefake);
  // const [GiamgiaShoe, setGiamgiaShoe] = useState(GiamgiaShoefake);
  const [LoaiGiayShoe, setLoaiGiayShoe] = useState(LoaiGiayShoefake);
  const [SizeGiayShoe, setSizeGiayShoe] = useState(SizeGiayShoefake);
  const [SoLuongShoe, setSoLuongShoe] = useState(SoLuongShoefake);
  const [ThongtinShoe, setThongtinShoe] = useState(ThongtinShoefake);
  const handleUpdateProducts = async () => {
    console.log('imge =>', selectedImage)
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("TengiayShoe", TengiayShoe);
    formData.append("HanggiayShoe", HanggiayShoe);
    formData.append("GiabanShoe", GiabanShoe);
    // formData.append("GiamgiaShoe", GiamgiaShoe);
    // console.log('check giam gia => backend =>', GiamgiaShoe)
    formData.append("LoaiGiayShoe", LoaiGiayShoe);
    formData.append("SizeGiayShoe", SizeGiayShoe);
    formData.append("SoLuongShoe", SoLuongShoe);
    formData.append("ThongtinShoe", ThongtinShoe);
    if (SoLuongShoe > 200) {
      toast.error("Số lượng giày quá lớn rồi :<");
      return;
    }
    if (GiabanShoe > 90000000) {
      toast.error("Số tiền quá lớn rồi :<");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3003/api/v1/product/info/update/${product.MASP}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data)
      toast.success('Hình như update được á, check lại thử xem');
      callback()
    } catch (error) {
      toast.error('Ohh nooo O.o !!')
      console.error("Error uploading image:", error);
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

      toast.success('Thêm hãng giày thành công')
    } catch (error) {
      console.error(error); toast.error('Thêm hãng giày không thành công')
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

      toast.success('Thêm loại giày thành công')
    } catch (error) {
      console.error(error);
      toast.error('Thêm loại giày không thành công')
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

      toast.success('Thêm kích cỡ thành công')
    } catch (error) {
      console.error(error);
      toast.error('Thêm kích cỡ không thành công')
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

  // Hàm định dạng số thành tiền tệ Việt Nam
  function formatCurrency(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  // Sử dụng hàm formatCurrency để định dạng giá sản phẩm và giá sau giảm giá
  const GIA = formatCurrency(parseFloat(product.GIA).toFixed(0));
  const giamgia = formatCurrency((product.GIA - product.GIA * product.giamgia / 100).toFixed(0));

  const sale = product.giamgia;

  const [modalIsOpen, setIsOpen] = useState(false);
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
  function openModal() {
    setIsOpen(true);

  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleDeleteProducts = () => {
    // Đảm bảo rằng product.MASP chứa giá trị mã sản phẩm cần xóa

    // Thay thế :masanpham trong URL bằng giá trị thực tế của MASP
    const url = `http://localhost:3003/api/v1/product/info/delete/${product.MASP}`;

    axios.delete(url)
      .then(response => {
        toast.success("Xóa sản phẩm giày thành công!!")
        console.log("Product deleted successfully!");
        callback()
        // Thực hiện các hành động khác sau khi xóa sản phẩm thành công nếu cần
      })
      .catch(error => {
        console.error("Error deleting product:", error);
        toast.error("Xóa sản phẩm giày không thành công!!")
        // Xử lý lỗi nếu có
      });
  };

  const color = product.giamgia === null ? 'info' : 'error';

  const renderStatus = (
    <Label
      variant="filled"
      color={color}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.giamgia !== null ? (
        <span>sale {product.giamgia}%</span>)
        :
        (
          <span>không giảm giá</span>
        )
      }
    </Label>
  );


  const renderImg = (

    <Box

      component="img"
      alt={product.description}
      src={`http://localhost:3003/images/${product.description}`}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );



  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {GIA}đ
      </Typography>
      &nbsp;  &nbsp;
      {giamgia} đ
    </Typography>
  );

  return (
    <>


      <Card onClick={openModal} className='container-cardProducts' >

        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.imageUrl && renderStatus}
          {renderStatus}
          {renderImg}

        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.TENSANPHAM}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <ColorPreview colors={product.MASP} /> */}

            {renderPrice}
          </Stack>
        </Stack>

      </Card>



      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="exit-modal">
          <i class="fa-regular fa-circle-xmark" onClick={closeModal}></i>
        </div>
        <div className="container-modalRegister">
          <div className="modalRegister">
            <h4>Thay đổi thông tin sản phẩm </h4>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Tên giày
              </label>
              <input
                value={TengiayShoe}
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Giày MWC NT85"
                disabled={DisableInput}
                onChange={(event) => setTengiayShoe(event.target.value)}
              />
            </div>
            <div class="input-group mb-3">
              <select
                class="form-select"
                id="inputGroupSelect02"
                disabled={DisableInput}
              >
                { }
                {DataHangBackend.map((hang) => {
                  if (hang.MAHANG === product.MAHANG) {
                    return (
                      <option selected
                        key={hang.MAHANG}
                        value={HanggiayShoe}
                        onChange={(event) => setHanggiayShoe(event.target.value)}
                      >
                        {hang.TENHANG}
                      </option>
                    );
                  } else {
                    return null; // Nếu không đáp ứng điều kiện, trả về null
                  }
                })}

                {DataHangBackend.map((hang) => (
                  <option
                    key={hang.MAHANG}
                    value={hang.MAHANG}
                    onChange={(event) => setHanggiayShoe(event.target.value)}
                  >
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
                  class="form-control mb-2"
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
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="259.000"
                value={GiabanShoe}
                disabled={DisableInput}
                onChange={(event) => setGiabanShoe(event.target.value)}
              />
            </div>
            {/* <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Giảm giá
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="30%"
                value={GiamgiaShoe}
                disabled={DisableInput}
                onChange={(event) => setGiamgiaShoe(event.target.value)}
              />
            </div> */}
            <div class="input-group mb-3">
              <select
                class="form-select"
                id="inputGroupSelect02"
                disabled={DisableInput}
                onChange={(event) => setHanggiayShoe(event.target.value)}
              >
                {DataLoaiBackend.map((loai) => {
                  if (loai.MALOAI === product.MALOAI) {
                    return (
                      <option selected
                        key={loai.MALOAI}
                        value={loai.MALOAI}

                      >
                        {loai.name}
                      </option>
                    );
                  } else {
                    return null; // Nếu không đáp ứng điều kiện, trả về null
                  }
                })}
                {DataLoaiBackend.map((loai) => (
                  <option
                    key={loai.MALOAI}
                    value={LoaiGiayShoe}
                    onChange={(event) => setLoaiGiayShoe(event.target.value)}
                  >
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
                class="form-select"
                id="inputGroupSelect02"
                disabled={DisableInput}
              >
                {DataLoaiBackend.map((size) => {
                  if (size.GIATRI === product.MAGIATRI) {
                    return (
                      <option selected
                        key={size.GIATRI}
                        value={size.MAGIATRI}
                        onChange={(event) => setHanggiayShoe(event.target.value)}
                      >
                        {size.GIATRI}
                      </option>
                    );
                  } else {
                    return null; // Nếu không đáp ứng điều kiện, trả về null
                  }
                })}
                {DataSizeBackend.map((size) => (
                  <option
                    key={size.MAGIATRI}
                    value={SizeGiayShoe}
                    onChange={(event) => setSizeGiayShoe(event.target.value)}
                  >
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
                type="number"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="100"
                value={SoLuongShoe}
                disabled={DisableInput}
                onChange={(event) => setSoLuongShoe(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Thông tin về đôi giày
              </label>
              <textarea
                disabled={DisableInput}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                value={ThongtinShoe}
                onChange={(event) => setThongtinShoe(event.target.value)}
              ></textarea>
            </div>
            <div className="modalRegister-sdt margin5px">
              <input

                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
              {selectedImage && <label> Chosen file: {selectedImage.name}</label>}
            </div>
            <div className="modalRegister-sdt margin5px">
              <button
                className="modalRegister-dangky btn btn-success mb-3"
                onClick={handleUpdateProducts}
              >
                Cập Nhật Sản Phẩm
              </button>
              <button
                className="modalRegister-dangky btn btn-danger mb-3 ml-custom"
                onClick={handleDeleteProducts}
              >
                Xóa Sản Phẩm
              </button>
            </div>

          </div>
        </div>
      </Modal>

    </>

  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
