import React from "react";
import "../assets/styles/imfoHomepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTruck,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
function ImfoHomepage() {
  return (
    <div className="container-imf">
      <div className="imf-child1">
        <FontAwesomeIcon icon={faCheckCircle} className="icon-child" />{" "}
        <span>Hàng chính hãng, chất lượng cao.</span>
      </div>
      <div className="imf-child2">
        <FontAwesomeIcon icon={faTruck} className="icon-child" />{" "}
        <span> Miễn phí giao hàng với đơn trên 500k</span>
      </div>
      <div className="imf-child3">
        <FontAwesomeIcon icon={faExchangeAlt} className="icon-child" />{" "}
        <span>Đổi hàng 30 ngày thủ tục đơn giản</span>
      </div>
    </div>
  );
}
export default ImfoHomepage;
