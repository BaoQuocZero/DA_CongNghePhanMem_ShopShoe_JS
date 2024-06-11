import React, { useEffect, useState } from "react";
import MyNavbar from "../components/NavbarhomePage";
import CarouselHomepage from "../components/CarousehomePagel";
import ListShoe from "../components/listShoe";
import ImfoHomepage from "../components/imfomationHomepage";
import ListShoeSeal from "../components/listShoeSeal";
import Footer from "../components/foolterHomepage";
import ListShoeSealNam from "../components/listShoeSeal copy";
import ChatRealTime from "./ComponentChat/ChatRealTime";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
const HomePage = () => {
  const tokenSetStorage = sessionStorage.getItem("accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Clean token to ensure no spaces or invalid characters
        const cleanedAuth = tokenSetStorage ? tokenSetStorage.trim() : "";
        console.log("Cleaned Auth token:", cleanedAuth); // Log cleaned token

        const response = await axios.get(
          "http://localhost:3003/api/v1/protected",
          {
            headers: { Authorization: `Bearer ${cleanedAuth}` },
          }
        );

        console.log("API response:", response.data); // Log API response

        if (
          response.data.message === "Protected data" &&
          !response.data.user.role
        ) {
          setIsAuthenticated(true);
          console.log("Oke");
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
    <>
      <MyNavbar />
      <CarouselHomepage />
      {isAuthenticated ? (
        <>
          {" "}
          <ChatRealTime />
        </>
      ) : (
        false
      )}

      <ImfoHomepage />
      <ListShoe />
      <ListShoeSealNam />
      <ListShoeSeal />
      <Footer />
    </>
  );
};

export default HomePage;
