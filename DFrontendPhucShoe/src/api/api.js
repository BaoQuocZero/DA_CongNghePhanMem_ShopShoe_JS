import React, { useState, useEffect } from 'react';


function AppCer() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3003/api/v1/product");
                if (!response.ok) {
                    throw new Error("Yêu cầu không thành công");
                }

                const jsonResponse = await response.json();
                const responseData = JSON.parse(jsonResponse);

                setData(responseData);
                console.log(responseData);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);
    console.log('apperdata=>', data)
    return (
        <div className="data-table">
            <table>
                <thead>
                    <tr>
                        <th>Mã </th>
                        <th>Tên Sản Phẩm</th>
                        <th>Tên Hãng</th>
                        <th>Giá bán</th>

                        <th>Mã Loại</th>
                        <th>Size </th>
                        <th>Số lượng</th>
                        <th> Hình ảnh</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((item) => (
                            <tr key={item.MASP}>
                                <td>{item.TENSANPHAM}</td>
                                <td>{item.TENHANG}</td>
                                <td>{item.GIA}</td>
                                <td>{item.MALOAI}</td>
                                <td>{item.GIATRI}</td>
                                <td>{item.SOLUONG}</td>
                                <td>{item.decription}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AppCer;
