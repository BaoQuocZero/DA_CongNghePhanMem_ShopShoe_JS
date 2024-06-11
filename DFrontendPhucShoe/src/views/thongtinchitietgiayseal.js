import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/thongtinchitietgiay.css";
const ThongTinChiTietGiaySeal = () => {
  const { state } = useLocation();
  const [counterValue, setCounterValue] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();
  let handleClickMuaHang = (event) => {
    if (selectedSize == null) {
      alert("Vui lòng chọn Size giày");
      event.preventDefault();
    } else {
      navigate(`/muahang/${state.id}`, {
        state: { giay: state, soLuong: counterValue, size: selectedSize },
      });
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const increment = () => {
    setCounterValue(counterValue + 1);
  };

  const decrement = () => {
    if (counterValue > 1) {
      setCounterValue(counterValue - 1);
    }
  };
  return (
    <div className="container">
      <div className="product-info">
        <form className="form">
          <div className="product-image">
            <span className="product-image_banner">Giảm {state.seal}%</span>
            <img className="image" src={state.image} alt={state.name} />
          </div>
          <div className="product-h3">
            <h3 className="h3"> Giày {state.name}</h3>
            <p className="product-price">
              ${(state.price * ((100 - state.seal) / 100)).toFixed(2)}{" "}
            </p>
            <span className="product-priceseal">${state.price}</span>
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default ThongTinChiTietGiaySeal;
