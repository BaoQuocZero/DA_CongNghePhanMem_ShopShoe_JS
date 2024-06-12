import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/homePage";
import ThongTinChiTietGiay from "./views/thongtinchitietgiay";
import ThongTinChiTietGiaySeal from "./views/thongtinchitietgiayseal";
import MuaHang from "./views/muahang";
import MuaHangSeal from "./views/muahangseal";
import TuyenDungPage from "./views/TuyenDung";
import AllSP from "./views/TatCaSanPham";
import SPNu from "./views/SpNu";
import SPNam from "./views/SpNam";
import Login from "./components/ComponentLogin/Login";
import ProfileCustomer from "./profileCustomer/profileCustomer";
import ListShoe from "./components/listShoe";
import Footer from "./components/foolterHomepage";
import MyNavbar from "./components/NavbarhomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "../src/dashbroand/src/Authentication/PrivateRoute";
import { AuthProvider } from "../src/dashbroand/src/Authentication/AuthContext";
import LoginView from "./dashbroand/src/sections/login/login-view.jsx";
import NotFoundPage from "./dashbroand/src/pages/page-not-found.jsx";
import ChatRealTime from "./views/ComponentChat/ChatRealTime.jsx";
import axios from "axios";
import "./ChatRealTime-Css.css";
const App = () => {
  const tokenSetStorage = sessionStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clean token to ensure no spaces or invalid characters
        const cleanedAuth = tokenSetStorage ? tokenSetStorage.trim() : "";

        const response = await axios.get(
          "http://localhost:3003/api/v1/protected",
          {
            headers: { Authorization: `Bearer ${cleanedAuth}` },
          }
        );

        if (
          response.data.message === "Protected data" &&
          !response.data.user.role
        ) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsAuthenticated(false);
        } else {
          console.error("Error fetching protected data:", error);
        }
      } finally {
        // setIsAuthenticated(true)
      }
    };

    fetchData();
  }, [tokenSetStorage]);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/thongtinchitietgiay/:shoes"
            element={
              <>
                <MyNavbar />

                <ThongTinChiTietGiay />
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponentThongtinchitiet">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
                <ListShoe />
                <Footer />
              </>
            }
          />
          {/* <Route
            path="/thongtinchitietgiayseal/:shoes"
            element={
              <>
                <MyNavbar />
                <ThongTinChiTietGiaySeal />
                <Footer />
              </>
            }
          /> */}
          <Route
            path="/muahang/:id"
            element={
              <>
                <MyNavbar />

                <MuaHang />
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent-muahang">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
                <Footer />
              </>
            }
          />
          <Route path="/muahangseal/:id" element={<MuaHangSeal />} />
          <Route
            path="/tuyendung"
            element={
              <>
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent-tuyendung">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
                <TuyenDungPage />
              </>
            }
          />
          <Route
            path="/tatca-sanpham"
            element={
              <>
                {" "}
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent-tatcasp">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
                <AllSP />
              </>
            }
          />
          <Route
            path="/nu-sanpham"
            element={
              <>
                {" "}
                <SPNu />
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent-spnu">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
              </>
            }
          />
          <Route
            path="/nam-sanpham"
            element={
              <>
                {" "}
                <SPNam />{" "}
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent-spnam">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile/:username"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {isAuthenticated ? (
                  <div className="ChatRealTime-CssComponent">
                    {" "}
                    <ChatRealTime />{" "}
                  </div>
                ) : (
                  false
                )}
                <ProfileCustomer />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <div className="class-center">
                <LoginView />
              </div>
            }
          />

          <Route path="/dashboard/*" element={<PrivateRoute />} />
          <Route path="/*" element={<NotFoundPage></NotFoundPage>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
