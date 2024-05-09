import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../src/components/ComponentLogin/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileCustomer from "./profileCustomer/profileCustomer";
import HomePage from "./view/homePage";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {" "}
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login></Login>
            </>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/profile/:"
          element={
            <>
              <Login></Login>
            </>
          }
        />
      </Routes>
      <Routes>
        {" "}
        <Route
          path="/profile/:username"
          element={
            <>
              <ProfileCustomer></ProfileCustomer>
            </>
          }
        />{" "}
      </Routes>
    </Router>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
