import { useState, useEffect } from "react";
import axios from "axios";
import './ListOrders.css';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ListOrdersCustomer = () => {
    const { username } = useParams();
    console.log('username', username)
    const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
    const [IsOpenChiTiet, setIsOpenChiTiet] = useState(false)
    const [MaDonHang, setMaDonHang] = useState(null)
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:3003/api/v1/donhangchuagiaokhachhang",
                {
                    taikhoan: username
                }
            );
            const sortedOrders = response.data.DT.sort((a, b) => new Date(b.ngaydonhang) - new Date(a.ngaydonhang));
            setListOdersChuaGiao(sortedOrders);
            console.log('check data', response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };



    const handleHuyDon = async (madonhang) => {

        console.log(madonhang)
        try {
            const response = await axios.put(`http://localhost:3003/api/v1/donhanghuy/update/${madonhang}`);

            console.log('check handleHuyDon', response.data);
            if (response.data.EC === 1) {
                toast.success('Hủy đơn thành công ^^!')
                fetchData();
            } else {
                toast.error(response.data.EM)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error('Đã xảy ra lỗi O.o !')
        }
    };
    const handleChiTiet = (madonhang) => {
        setMaDonHang(madonhang)
        setIsOpenChiTiet(!IsOpenChiTiet)


    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const optionsDate = { day: '2-digit', month: 'numeric', year: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

        const formattedDate = new Intl.DateTimeFormat('vi-VN', optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

        return `${formattedDate}, ${formattedTime}`;
    };
    const filteredOrder = ListOdersChuaGiao.find(order => order.madonhang === MaDonHang);
    return (
        <>

            <div className="wrap">


            </div>
            <table className="table">
                <thead>
                    <tr> <th>Mã Đơn Hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Thời gian</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>
                        <th>Bạn muốn hủy đơn?</th>

                    </tr>
                </thead>
                <tbody>
                    {ListOdersChuaGiao.map((order, index) => (
                        <tr key={index}>
                            <td>{order.madonhang}</td>
                            <td>{order.ten}</td>
                            <td>{formatDate(order.ngaydonhang)}</td>
                            <td>{formatCurrency(order.thanhtien)}</td>
                            <td>{order.trangthai}</td>

                            <td>
                                <button className="btn btn-danger" onClick={() => handleHuyDon(order.madonhang)}>Hủy Đơn</button>
                            </td>


                        </tr>

                    ))}      </tbody>
            </table>
            {IsOpenChiTiet && filteredOrder && (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Mã đơn hàng</th>
                            <th>Tên</th>
                            <th>Ngày đặt hàng</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Thành tiền</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Hình ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{filteredOrder.madonhang}</td>
                            <td>{filteredOrder.ten}</td>
                            <td>{new Date(filteredOrder.ngaydonhang).toLocaleString()}</td>
                            <td>{filteredOrder.tensanpham}</td>
                            <td>{filteredOrder.soluong}</td>
                            <td>{formatCurrency(filteredOrder.gia)}</td>
                            <td>{formatCurrency(filteredOrder.thanhtien)}</td>
                            <td>{filteredOrder.diachi}</td>
                            <td>{filteredOrder.sodienthoai}</td>
                            <td>{filteredOrder.trangthai}</td>
                            <td>
                                <img src={`http://localhost:3003/images/${filteredOrder.description}`} alt={filteredOrder.description} width="50" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}


        </>
    );
}

export default ListOrdersCustomer;
