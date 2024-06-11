import React from "react";
import { ShoeList } from "../components/childComponent/childListShoe";
import axios from "axios";
import { useState, useEffect } from "react";
function ListShoe() {
  const [data, setData] = useState(null);
  const [hang, setHang] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3003/api/v1/productall"
        );

        setData({
          data: response.data.DT,

          loading: false,
        });
        setHang({
          hang: response.data.hang,
          loading: false,
        });
        // console.log(response.data);
      } catch (error) {
        console.error(error.message);
        setData({
          error: error.message,
          loading: false,
        });
      }
    };

    fetchData();
  }, []);

  // console.log("checkdatalistSHOE", data);
  // console.log("check Hang", hang);
  return (
    <div className="App">
      <ShoeList shoes={data} hang={hang} />
    </div>
  );
}

export default ListShoe;
