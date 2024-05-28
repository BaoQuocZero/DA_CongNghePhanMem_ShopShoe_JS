import React, { Suspense } from "react";
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

const App = () => (
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

              <ListShoe />
              <Footer />
            </>
          }
        />
        <Route
          path="/thongtinchitietgiayseal/:shoes"
          element={
            <>
              <MyNavbar />
              <ThongTinChiTietGiaySeal />
              <Footer />
            </>
          }
        />
        <Route
          path="/muahang/:id"
          element={
            <>
              <MyNavbar />
              <MuaHang />
              <Footer />
            </>
          }
        />
        <Route path="/muahangseal/:id" element={<MuaHangSeal />} />
        <Route path="/tuyendung" element={<TuyenDungPage />} />
        <Route path="/tatca-sanpham" element={<AllSP />} />
        <Route path="/nu-sanpham" element={<SPNu />} />
        <Route path="/nam-sanpham" element={<SPNam />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile/:username"
          element={
            <Suspense fallback={<div>Loading...</div>}>
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

export default App;
