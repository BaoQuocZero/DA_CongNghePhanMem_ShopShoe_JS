import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./listShoe.css";

export const handleItemClick = (shoe, navigate) => {
    console.log("Item clicked:", shoe);
    navigate(`/thongtinchitietgiay/${shoe.MASP}`, { state: shoe });
};

export const renderShoeItem = (shoe, navigate) => {
    console.log("Rendering shoe item:", shoe);

    // Làm tròn giá đến hai chữ số sau dấu thập phân
    const roundedPrice = parseFloat(shoe.GIA).toFixed(0);
    var so = parseFloat(roundedPrice);

    const price = so.toLocaleString();
    return (
        <li key={shoe.MASP} onClick={() => handleItemClick(shoe, navigate)}>
            <img src={`http://localhost:3003/images/${shoe.description}`} alt={shoe.TENSANPHAM} />
            <p id='CLS-tensp'>{shoe.TENSANPHAM}</p>
            <p>{price}đ</p>
        </li>
    );
};

export const ShoeList = ({ shoes }) => {
    const navigate = useNavigate();

    if (!shoes || !shoes.data || !Array.isArray(shoes.data)) {
        return <div>No valid shoes data available</div>;
    }

    try {
        // Lọc danh sách giày nam và giày nữ từ dữ liệu shoes.data
        const maleShoes = shoes.data.filter(shoe => String(shoe.MALOAI) === "15").slice(0, 5);
        const femaleShoes = shoes.data.filter(shoe => String(shoe.MALOAI) === "16").slice(0, 5);

        // Kết hợp danh sách giày nam và giày nữ
        const combinedShoes = [...maleShoes, ...femaleShoes];

        return (
            <div className="shoe-list">
                <h2 className='tieude'>Các Sản Phẩm Giày</h2>
                <hr></hr>
                <ul>
                    {combinedShoes.map((shoe) => renderShoeItem(shoe, navigate))}
                </ul>
                <hr></hr>
            </div>
        );
    } catch (error) {
        console.error("Error rendering shoes:", error);
        return <div>Error rendering shoes</div>;
    }
};
