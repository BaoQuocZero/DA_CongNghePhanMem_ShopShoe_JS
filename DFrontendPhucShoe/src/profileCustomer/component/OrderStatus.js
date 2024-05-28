import React, { useState, useEffect } from "react";
import "./OrderStatus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSpinner,
  faCheckCircle,
  faShippingFast,
  faHome,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    fetch("/api/order-status")
      .then((response) => response.json())
      .then((data) => setOrderStatus(data.status))
      .catch((error) => console.error("Error fetching order status:", error));
  }, []);

  const statuses = {
    processing: {
      icon: faSpinner,
      label: "Đang xử lý",
      className: "processing",
    },
    confirmed: {
      icon: faCheckCircle,
      label: "Đã xác nhận",
      className: "confirmed",
    },
    shipped: {
      icon: faShippingFast,
      label: "Đang giao hàng",
      className: "shipped",
    },
    delivered: { icon: faHome, label: "Đã giao", className: "delivered" },
    cancelled: { icon: faTimesCircle, label: "Đã hủy", className: "cancelled" },
  };

  const status = statuses[orderStatus] || {};

  return (
    <div className="order-status-container">
      <div className="order-icon">
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      {status.icon && (
        <div className={`status-item ${status.className}`}>
          <FontAwesomeIcon icon={status.icon} />
          <span>{status.label}</span>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
