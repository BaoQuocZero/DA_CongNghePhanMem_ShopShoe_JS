import "../assets/styles/NavBar.css";
import "../assets/styles/NavBarUser.css";
import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import axios from "axios";
const NavBarUser = () => {
  const [openLogout, setOpenLogout] = useState(false);

  const handleOpenLogout = () => {
    setOpenLogout(!openLogout);
    // console.log(openLogout);
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3003/api/v1/logout");

      // console.log(response.data.EC);
      if (response.data.EC === 0) {
        sessionStorage.removeItem("accessToken");
        window.location.href = "/login";
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="navbar" id="navbar">
      <div color="light" light expand="md" className="nav">
        <div className="isOpen">
          {/* <img src={LogoNavbar} alt="Logo" className='image-navbar' /> */}
          <a className="image-navbar" href="/">
            PhucShoe
          </a>
          <div className="ml-auto">
            <a href="/" className="nav-item nav-item1">
              Giới Thiệu
            </a>
            <a href="/nu-sanpham" className="nav-item nav-item1">
              Nữ
            </a>
            <a href="/nam-sanpham" className="nav-item nav-item2">
              Nam
            </a>
            {/* <a href="/contact" className='nav-item'>Trẻ em</a> */}
            <a href="/tatca-sanpham" className="nav-item nav-item4">
              Tất Cả
            </a>
          </div>
          <div className="cart-div">
            <a href="/">
              <FontAwesomeIcon icon={faCartShopping} className="font-awe" />
            </a>
            <a onClick={handleOpenLogout}>
              <FontAwesomeIcon
                icon={faUserTie}
                className="font-awe icon-logout"
              />
              {openLogout && (
                <div className="container-logoutUser">
                  <p className="logout" onClick={handleLogout}>
                    Logout
                  </p>
                </div>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarUser;
