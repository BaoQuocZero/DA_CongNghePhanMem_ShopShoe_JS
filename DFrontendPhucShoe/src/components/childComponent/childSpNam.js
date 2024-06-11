import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./listShoe.css";
import "../childComponent/chillTatCaSP.css";

export const handleItemClick = (shoe, navigate) => {
  navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
  // Làm tròn giá đến hai chữ số sau dấu thập phân
  const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
  var so = parseFloat(roundedPrice);

  const price = so.toLocaleString();
  return (
    <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
      <img
        src={`http://localhost:3003/images/${shoe.description}`}
        alt={shoe.TENSANPHAM}
      />
      <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
      <p>{price}đ</p>
    </li>
  );
};

export const ChildSPNam = ({ shoes }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'
  const [selectedBrand, setSelectedBrand] = useState("");

  const [selectedPriceRange, setSelectedPriceRange] = useState("Tất cả");

  const checkPriceRange = (price) => {
    const numericPrice = parseFloat(price);

    switch (selectedPriceRange) {
      case "Dưới 200k":
        return numericPrice < 200000;
      case "Dưới 300k":
        return numericPrice < 300000;
      case "Dưới 400k":
        return numericPrice < 400000;
      case "Dưới 500k":
        return numericPrice < 500000;
      default:
        return true;
    }
  };

  if (
    !shoes ||
    !shoes.data ||
    !Array.isArray(shoes.data) ||
    shoes.data.length === 0
  ) {
    return <div>No shoes available</div>;
  }

  // Filter the list based on the search term and selected brand
  const filteredShoes = shoes.data.filter(
    (shoe) =>
      shoe.TENSANPHAM.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBrand === "" || shoe.TENHANG === selectedBrand) &&
      (selectedPriceRange === "Tất cả" || checkPriceRange(shoe.GIA)) &&
      shoe.MALOAI === 15
  );

  // Sort the list based on the current sortOrder
  const sortedShoes = [...filteredShoes].sort((a, b) => {
    const priceA = parseFloat(a.GIA);
    const priceB = parseFloat(b.GIA);

    if (sortOrder === "asc") {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // Get unique brands from the data
  const uniqueBrands = [...new Set(shoes.data.map((shoe) => shoe.TENHANG))];

  return (
    <div className="shoe-list">
      <h2 className="tieude" id="tieude_tatcasp">
        Sản Phẩm Nam
      </h2>
      <div>
        <input
          className="input-timSP"
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`button-sort ${sortOrder === "asc" ? "asc" : "desc"}`}
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sắp xếp theo giá {sortOrder === "asc" ? "tăng dần" : "giảm dần"}
        </button>
      </div>
      {/* <div className="dropdown-container">
        <label className="label-brand" htmlFor="brandFilter">
          Chọn hãng:
        </label>
        <select
          id="brandFilter"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="select-brand"
        >
          {uniqueBrands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div> */}
      <div className="dropdown-container">
        <label className="label-price" htmlFor="priceFilter">
          Chọn giá:
        </label>
        <select
          id="priceFilter"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          className="select-price"
        >
          {["Tất cả", "Dưới 200k", "Dưới 300k", "Dưới 400k", "Dưới 500k"].map(
            (price, index) => (
              <option key={index} value={price}>
                {price}
              </option>
            )
          )}
        </select>
      </div>

      <hr></hr>
      <ul>
        {sortedShoes.map((shoe) => (
          <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
            <img
              src={`http://localhost:3003/images/${shoe.description}`}
              alt={shoe.TENSANPHAM}
            />
            <p id="CLS-tensp">{shoe.TENSANPHAM}</p>
            <p>{parseFloat(shoe.GIA).toLocaleString()}đ</p>
          </li>
        ))}
      </ul>
      <hr></hr>
    </div>
  );
};
