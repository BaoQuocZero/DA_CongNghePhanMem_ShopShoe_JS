import React from "react";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import Slide1 from "./assets/image/slide1.jpg";
const Login = () => {
  //   const registerBtn = document.getElementById("register");
  //   const container = document.getElementById("container");
  //   const loginBtn = document.getElementById("login");
  //   registerBtn.addEventListener("click", () => {
  //     container.classList.add("active");
  //   });
  //   registerBtn.addEventListener("click", () => {
  //     container.classList.add("active");
  //   });
  //   loginBtn.addEventListener("click", () => {
  //     container.classList.remove("active");
  //   });
  const navigate = useNavigate();

  const [UsernameLogin, setUsernameLogin] = useState("");
  const [PasswordLogin, setPasswordLogin] = useState("");
  const [UsernameRegister, setUsernameRegister] = useState("");
  const [PasswordRegister, setPasswordRegister] = useState("");
  const [RePasswordRegister, setRePasswordRegister] = useState("");

  const handleRegister = (event) => {
    console.log(UsernameRegister);
    console.log(PasswordRegister);
    console.log(RePasswordRegister);
    event.preventDefault();
    if (
      !UsernameRegister ||
      !RePasswordRegister ||
      PasswordRegister != RePasswordRegister
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng ký");
    } else {
      setIsActive(true);
      toast.success("Đăng ký thành công");
      axios
        .post("http://localhost:3003/api/v1/register", {
          username: UsernameRegister,
          password: PasswordRegister,
        })
        .then((response) => {
          // Xử lý phản hồi từ máy chủ nếu cần
          console.log(response);
        })
        .catch((error) => {
          // Xử lý lỗi nếu cần
        });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!UsernameLogin || !PasswordLogin) {
      toast.error("Vui lòng điền đầy đủ thông tin đăng nhập");
    } else {
      toast.success("Đăng nhập thành công");
      setIsActive(false);
      axios
        .post("http://localhost:3003/api/v1/login", {
          username: UsernameLogin,
          password: PasswordLogin,
        })
        .then((response) => {
          console.log(response);
          console.log(response.data.EC);
          if (response.data.EC == 1) {
            navigate("/dashboard");
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu cần
        });
    }
  };

  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  return (
    <>
      <div className="container-login">
        <div
          className={"container1" + (isActive ? " active" : "")}
          id="container"
        >
          {" "}
          <div className="form-container sign-up">
            <form action="">
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <span>or use your email for registeration</span>
              <div className="couple-text">
                <input
                  type="text"
                  className="text-input"
                  onChange={(event) => setUsernameRegister(event.target.value)}
                />
                <div className="labelline"> Username</div>
              </div>

              <div className="couple-text">
                <input
                  type="password"
                  className="text-input"
                  name="password"
                  onChange={(event) => setPasswordRegister(event.target.value)}
                  autoComplete="on"
                />

                <div className="labelline"> Password</div>
              </div>
              <div className="couple-text">
                <input
                  type="password"
                  name="re-password"
                  className="text-input"
                  onChange={(event) =>
                    setRePasswordRegister(event.target.value)
                  }
                />
                <div className="labelline"> Re-Password</div>
              </div>
              <button className="btn-accept" onClick={handleRegister}>
                Sign up
              </button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form action="">
              <h1>Sign in</h1>
              <div className="social-icons">
                <a href="#" className="icon">
                  <i className="fab fa-google-plus"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <span>or use your email for registeration</span>
              <div className="couple-text">
                <input
                  type="text"
                  className="text-input"
                  onChange={(event) => setUsernameLogin(event.target.value)}
                />
                <div className="labelline"> Username</div>
              </div>

              <div className="couple-text">
                <input
                  type="password"
                  className="text-input"
                  autoComplete="on"
                  name="password"
                  onChange={(event) => setPasswordLogin(event.target.value)}
                />
                <div className="labelline"> Password</div>
              </div>
              <a href="" className="tag">
                forget your password ?
              </a>
              <button className="btn-accept" onClick={handleLogin}>
                Sign in
              </button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>HELLO, MY FRIEND !!</h1>
                <p>
                  Register with your personal details to use all of site
                  features
                </p>
                <button
                  className="hidden"
                  id="login"
                  onClick={handleLoginClick}
                >
                  {" "}
                  Sign in
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1> WELCOME BACK</h1>
                <p>Enter your personal details to use all of site features</p>
                <button
                  className="hidden"
                  id="register"
                  onClick={handleRegisterClick}
                >
                  {" "}
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* -------------------- */}
        </div>
      </div>{" "}
    </>
  );
};

export default Login;
