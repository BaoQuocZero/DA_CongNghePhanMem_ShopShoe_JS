
import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';
import { useState, useEffect } from 'react';
import Router from './routes/sections';
import ThemeProvider from './theme';
import Loading from "../../components/ComponentLoading/CompnentLoading.tsx";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// ----------------------------------------------------------------------

export default function App() {
  // const tokenSetStorage = sessionStorage.getItem('accessToken')
  // const token = useLocation();

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {

  //       if (tokenSetStorage === token.state.accessToken) {
  //         setLoading(false);
  //       } else {


  //         window.location.href = "/admin";

  //       }


  //     } catch (error) {
  //       console.error("Error checking token:", error);
  //       // Nếu có lỗi (ví dụ: token hết hạn), đưa người dùng về trang đăng nhập
  //       // window.location.href = "/admin";
  //     }
  //   };

  //   checkToken();
  // }, []);
  useScrollToTop();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, []);
  // if (loading) {
  //   return <Loading />
  // }
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>

  );
} 
