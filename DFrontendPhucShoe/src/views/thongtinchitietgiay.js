import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/thongtinchitietgiay.css";
import { toast } from "react-toastify";
const ThongTinChiTietGiay = () => {
  const { state } = useLocation();
  const [counterValue, setCounterValue] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setprice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (state.GIA) {
      const GIA = parseFloat(state.GIA).toFixed(0);
      const GIASP = parseFloat(GIA);
      setprice(GIASP.toLocaleString());
    }
  }, [state.GIA]);
  let handleClickMuaHang = (event) => {
    if (selectedSize == null) {
      toast.error("Vui lòng chọn Size giày");
      event.preventDefault();
    } else {
      navigate(`/muahang/${state.MASP}`, {
        state: { giay: state, soLuong: counterValue, size: selectedSize },
      });
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const increment = () => {
    if (counterValue + 1 > state.SOLUONG) {
      toast.error(
        "Số lượng mà bạn đặt mua đã vượt quá số lượng trong kho hàng hiện có, rất xin lỗi vì sự bất tiện này"
      );
      setCounterValue(state.SOLUONG);
    } else {
      setCounterValue(counterValue + 1);
    }
  };
  const decrement = () => {
    if (counterValue > 1) {
      setCounterValue(counterValue - 1);
    }
  };

  return (
    <>
      <div className="container">
        <div className="product-info">
          <form className="form">
            <div className="product-image">
              <img
                className="image"
                src={`http://localhost:3003/images/${state.description}`}
                alt={state.TENSANPHAM}
              />
            </div>
            <div className="product-h3">
              <h3 className="h3"> Giày {state.TENSANPHAM}</h3>
              <p className="product-price">{price}đ</p>
              <div className="size">
                <p className="size-p">Size</p>
                {["37", "38", "39", "40"].map((size) => (
                  <div
                    key={size}
                    className={`size-option ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    <p
                      className={`size-text ${
                        selectedSize === size ? "selected-text" : ""
                      }`}
                    >
                      {size}
                    </p>
                  </div>
                ))}
              </div>
              <hr></hr>
              <p className="con-hang">Còn hàng</p>
              <div className="product-h3_muahang">
                <div className="counter-container">
                  <div onClick={decrement} className="span1">
                    -
                  </div>
                  <input
                    type="text"
                    id="counter"
                    value={counterValue}
                    min={1}
                    max={5000}
                    readOnly
                  />
                  <div onClick={increment} className="span2">
                    <p>+</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="purchase-button"
                  onClick={(event) => handleClickMuaHang(event)}
                >
                  Mua Hàng
                </button>
              </div>
              <div className="container-thongtinsanpham">
                <div className="container-thongtinsanpham_mota">
                  <h4>Mô tả sản phẩm</h4>
                  <p className="thongtinsp">{state.THONGTINSANPHAM}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr></hr>
    </>
  );
};

export default ThongTinChiTietGiay;
