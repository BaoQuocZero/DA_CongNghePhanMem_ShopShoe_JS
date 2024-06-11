import React from "react";
import { ChildSPNu } from "../components/childComponent/childSpNu";
import axios from "axios";
import { useState, useEffect } from "react";
// const shoesDatas = [
//     { id: 1, name: 'Puma', image: require('../assets/images-shoes/listShoe1.jpg'), href: '/cart', price: 99.99 },
//     { id: 2, name: 'MLB', image: require('../assets/images-shoes/listShoe2.jpg'), href: '/cart', price: 50.99 },
//     { id: 3, name: 'MLB Bê', image: require('../assets/images-shoes/listShoe3.jpg'), href: '/cart', price: 59.99 },
//     { id: 4, name: 'SkyDi', image: require('../assets/images-shoes/listShoe4.jpg'), href: '/cart', price: 29.99 },
//     { id: 5, name: 'NERDY', image: require('../assets/images-shoes/listShoe5.jpg'), href: '/cart', price: 30.99 },
//     { id: 6, name: 'Nardi', image: require('../assets/images-shoes/listShoe6.jpg'), href: '/cart', price: 59.99 },
//     { id: 7, name: 'Lacoste Hydez ', image: require('../assets/images-shoes/listShoe7.jpg'), href: '/cart', price: 59.99 },
//     { id: 8, name: 'Nike Air ', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },
//     { id: 9, name: 'Nike Air ', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },
//     { id: 9, name: 'Nike Air ', image: require('../assets/images-shoes/listShoe8.jpg'), href: '/cart', price: 59.99 },

//     // Add more shoes as needed
// ];

function ListSpNu() {
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
          data: response.data.hang,
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

  // console.log('checkdatalistSHOE', data);

  return (
    <div className="App">
      <ChildSPNu shoes={data} hang={hang} />
    </div>
  );
}

export default ListSpNu;
