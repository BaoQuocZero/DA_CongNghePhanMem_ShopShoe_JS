// File: App.js

import React, { useState } from "react";
import "../assets/styles/LoginAdmin.css"; // Hãy chắc chắn bạn đã tạo file App.css cho các kiểu của bạn
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setToggled] = useState(false);
  const [data, setAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/api/v1/admin");

        setAdmin({
          data: response.data.admin,

          loading: false,
        });

        // console.log(response.data);
      } catch (error) {
        console.error(error.message);
        setAdmin({
          error: error.message,
          loading: false,
        });
      }
    };

    fetchData();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleColor = () => {
    setToggled(!isToggled);
  };

  const handleInput = (event) => {
    const input = event.target;

    if (input) {
      input.style.outline = "2px solid blue";
    }
  };
  const [mess1, setMess] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      const input = document.getElementById("email");

      // Kiểm tra xem phần tử được click có phải là input hay không
      if (input && !input.contains(event.target)) {
        input.style.outline = ""; // Loại bỏ vòng xanh
      }
      const inputPass = document.getElementById("pass");

      // Kiểm tra xem phần tử được click có phải là input hay không
      if (inputPass && !inputPass.contains(event.target)) {
        inputPass.style.outline = ""; // Loại bỏ vòng xanh
      }
    };

    // Thêm sự kiện click cho document
    document.addEventListener("click", handleClickOutside);

    // Cleanup: loại bỏ sự kiện khi component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogin = async () => {
    const taikhoan = document.getElementById("email").value;

    const matkhau = document.getElementById("pass").value;

    try {
      const response = await axios.post("http://localhost:3003/api/v1/admin", {
        taikhoanAdmin: taikhoan,
        matkhauAdmin: matkhau,
      });
      //   console.log(response.data.message);
      if (response.data.Login) {
        // console.log("OKe");
        const rand1 = Math.floor(Math.random() * 20);
        setLoggedIn(true);
        toast.success("Đăng Nhập Thành Công");
        setTimeout(() => {
          navigate(`/PageAdmin`);
        }, 500);
      }
    } catch (error) {
      toast.error("Đăng Nhập Thất Bại");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href =
      "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=online&client_id=1045948776443-tm14dk8uqouu5k1dp7hrnpafhg00cafg.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fgateway73zncdk1.monfansubvn.com%2Fapi%2Fv2%2Fserver%2Foauth%2Fgoogle&state&scope=email%20profile&approval_prompt=auto";
  };
  console.log("check mess", mess1);
  //   console.log(data);
  const navigate = useNavigate();
  return (
    <div className={` container-LoginAdmin ${isToggled ? "dark-mode" : ""}`}>
      <div className="containerLogin">
        <div className="container-LoginImages">
          <div>
            <div className="click">
              <button
                id="light-dark"
                className="icon-sun-dark"
                onClick={toggleColor}
              >
                <i className="fa-solid fa-moon"></i>
              </button>
              <button
                id="light-sun"
                className="icon-sun-dark"
                onClick={toggleColor}
              >
                <i className="fa-solid fa-sun"></i>
              </button>
            </div>
          </div>
          <img
            className="imageAdmin "
            src={require("../assets/image-logo/loginbanner-e591ea61.png")}
            alt="Login Banner"
          />
        </div>

        <div className="ContainerLoginAdminif">
          <div className="login">
            <h3 id="loginh1" className="loginchung">
              Đăng Nhập Để Tiếp Tục
            </h3>
            <p id="loginh2" className="loginchung">
              Đăng nhập để bạn có thể thuận tiện trong việc mua hàng
            </p>
            <div className="Chaiconemail" id="Chaiconemail">
              <i
                className="fa-solid fa-envelope"
                ClassName="iconemail"
                id="fa-envelope"
              ></i>
              <input
                type="text"
                placeholder="Địa chỉ Email"
                className="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onClick={(event) => handleInput(event)}
              />
            </div>

            <br />
            <div className="chaiconlock" id="chaiconlock">
              <i
                className="fa-solid fa-lock"
                ClassName="iconemail"
                id="fa-lock"
              ></i>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="pass"
                id="pass"
                value={password}
                onClick={(event) => handleInput(event)}
                onChange={handlePasswordChange}
              />
            </div>
            <br />
            <button
              type="submit"
              className="dangnhap"
              id="dangnhap"
              onClick={() => handleLogin(navigate)}
            >
              Đăng Nhập
            </button>
            <p className="hoac">- hoặc -</p>
            <button className="dangnhapgg" onClick={handleGoogleLogin}>
              <img
                src="https://www.monfansubvn.com/assets/gglogin_ico-464e961b.svg"
                className="hinhgg"
              />
              Đăng nhập bằng google
            </button>
            <div className="dangnhapp">
              <p style={{ color: "gray" }}>
                <a href="" className="taotaikhoan">
                  Tạo tài khoản mới
                </a>{" "}
                -{" "}
                <a
                  href="https://www.facebook.com/minute2701/"
                  className="taotaikhoan"
                >
                  Quên mật khẩu
                </a>
              </p>
            </div>
            <div className="dieukhoan">
              <p style={{ color: "gray" }}>
                Khi đăng nhập hoặc tạo tài khoản là bạn đã đồng ý với{" "}
                <a
                  href="https://www.facebook.com/minute2701/"
                  className="taotaikhoan"
                >
                  Chính sách bảo mật của chúng tôi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
