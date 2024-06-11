import { useState, useEffect } from "react";
import axios from "axios";
import './ListOrders.css';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ListOrdersCustomerHuyDon = () => {
    const { username } = useParams();
    console.log('username', username)
    const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
    const [IsOpenChiTiet, setIsOpenChiTiet] = useState(false)
    const [MaDonHang, setMaDonHang] = useState(null)
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:3003/api/v1/donhangdahuygiaokhachhang",
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
                    {ListOdersChuaGiao.map((order, index) => (
                        <tr key={index}>
                            <td>{order.madonhang}</td>
                            <td>{order.ten}</td>
                            <td>{new Date(order.ngaydonhang).toLocaleString()}</td>
                            <td>{order.tensanpham}</td>
                            <td>{order.soluong}</td>
                            <td>{formatCurrency(order.gia)}</td>
                            <td>{formatCurrency(order.thanhtien)}</td>
                            <td>{order.diachi}</td>
                            <td>{order.sodienthoai}</td>
                            <td ><strong className="text-danger">{order.trangthai}</strong></td>
                            <td>
                                <img src={`http://localhost:3003/images/${order.description}`} alt={order.description} width="50" />
                            </td>
                        </tr>

                    ))}      </tbody>
            </table>



        </>
    );
}

export default ListOrdersCustomerHuyDon;
