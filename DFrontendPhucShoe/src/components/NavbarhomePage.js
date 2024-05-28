import "../assets/styles/NavBar.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const MyNavbar = () => {
  const token = sessionStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [imgAvatar, setImgAvatar] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const axiosWithCredentials = axios.create({
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (username) {
        try {
          const DataHang = await axiosWithCredentials.get(
            `http://localhost:3003/api/v1/user/info/${username}`
          );
          setImgAvatar(DataHang.data.DT.results[0].avatar);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [username, axiosWithCredentials]);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.taikhoan);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [token]);

  const handleLoginUser = () => {
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleProfile = () => {
    navigate(`/profile/${username}`, {
      state: { access_token: token },
    });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    navigate("/");
    toast.success("Đăng xuất thành công ^^!");
  };
  console.log("Dropdown state:", isDropdownOpen);

  return (
    <div className="navbar" id="navbar">
      <div color="light" light expand="md" className="nav">
        <div className="isOpen">
          <a className="image-navbar" href="/">
            PhucShoe
          </a>
          <div className="ml-autoo">
            <a href="/" className="nav-item nav-item1">
              Giới Thiệu
            </a>
            <a href="/nu-sanpham" className="nav-item nav-item1">
              Nữ
            </a>
            <a href="/nam-sanpham" className="nav-item nav-item2">
              Nam
            </a>
            <a href="/tatca-sanpham" className="nav-item nav-item4">
              Tất Cả
            </a>
          </div>
          <div className="cart-divv">
            {isAuthenticated ? (
              <div className="user-info">
                <span className="username">{username}</span>
                <div className="nav-avatar" onClick={toggleDropdown}>
                  <img
                    className="nav-avatarUser"
                    src={`http://localhost:3003/images/${imgAvatar}`}
                    alt="Avatar"
                  />
                </div>
                {isDropdownOpen ? (
                  <div className="dropdown-menu">
                    <button onClick={handleProfile} className="dropdown-item">
                      Hồ Sơ
                    </button>
                    <button onClick={handleLogout} className="dropdown-item">
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  false
                )}
              </div>
            ) : (
              <button
                className="btn btn-dark nav-dangnhap"
                onClick={handleLoginUser}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
