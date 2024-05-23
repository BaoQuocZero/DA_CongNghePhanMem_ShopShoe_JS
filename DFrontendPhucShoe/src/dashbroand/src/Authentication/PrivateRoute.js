import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Authentication/AuthContext.js";
import App from "../../src/app.jsx";
import axios from "axios";
import Loading from "../../../components/ComponentLoading/CompnentLoading.tsx";
const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(true);
  const auth = sessionStorage.getItem("accessToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Làm sạch token để đảm bảo không có khoảng trắng hoặc ký tự không hợp lệ
        const cleanedAuth = auth ? auth.trim() : "";
        console.log("Cleaned Auth token:", cleanedAuth); // Log token đã được làm sạch

        const response = await axios.get(
          "http://localhost:3003/api/v1/protected",
          {
            headers: { Authorization: `Bearer ${cleanedAuth}` },
          }
        );

        console.log("API response:", response.data); // Log phản hồi từ API

        if (
          response.data.message === "Protected data" &&
          response.data.user.role === "3"
        ) {
          setRedirect(false);
          console.log("Oke");
        } else {
          setRedirect(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setRedirect(true);
        } else {
          console.error("Lỗi khi tải dữ liệu được bảo vệ:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  if (loading) {
    return <Loading />;
  }

  if (redirect) {
    return <Navigate to="/admin" />;
  }

  if (!redirect) {
    return <App />;
  }
};

export default PrivateRoute;
