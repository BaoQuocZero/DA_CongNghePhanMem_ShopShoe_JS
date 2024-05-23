import { useState, useEffect } from "react";
import axios from "axios";
import './ListOrders.css';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListOrders = () => {
    const navigate = useNavigate()
    const [ListOdersChuaGiao, setListOdersChuaGiao] = useState([]);
    const [IsOpenChiTiet, setIsOpenChiTiet] = useState(false)
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3003/api/v1/donhangchuagiao");
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

    const handleXacNhanGiaoHang = async (madonhang) => {

        console.log(madonhang)
        try {
            const response = await axios.put(`http://localhost:3003/api/v1/donhang/update/${madonhang}`);

            console.log('check handleXacNhanGiaoHang', response.data);
            if (response.data.EC === 1) {
                toast.success('Giao hàng thành công ^^!')
                fetchData();
            } else {
                toast.error(response.data.EM)
            }
        } catch (error) {
            console.error("Error fetching data:", error); toast.error('Đã xảy ra lỗi O.o !')
        }
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
        setIsOpenChiTiet(!IsOpenChiTiet)
    }
    const handleMoveRouteDaGiao = () => {
        navigate('/dashboard/ordersDaGiao')

    }
    const handleMoveRouteHuyDon = () => {
        navigate('/dashboard/ordersDaHuy')
    }
    const handleMoveRouteChiTietHoaDon = () => {
        navigate('/dashboard/ordersChiTiet')
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const optionsDate = { day: '2-digit', month: 'numeric', year: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };

        const formattedDate = new Intl.DateTimeFormat('vi-VN', optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

        return `${formattedDate}, ${formattedTime}`;
    };
    return (
        <>
            <h2>Đơn Hàng</h2>
            <div className="wrap">

                <button className="btn btn-success" onClick={handleMoveRouteDaGiao}>
                    Đơn hàng đã giao
                </button>
                <button className="btn btn-danger ml-4" onClick={handleMoveRouteHuyDon}>
                    Thùng Rác
                </button>
                <button className="btn btn-info " onClick={handleMoveRouteChiTietHoaDon}>
                    Chi Tiết Hóa Đơn
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr> <th>Mã Đơn Hàng</th>
                        <th>Tên khách hàng</th>
                        <th>Thời gian</th>
                        <th>Thành tiền</th>
                        <th>Trạng thái</th>
                        <th>Xác nhận giao hàng</th>
                        <th>Hủy đơn</th>
                        <th>Chi Tiết</th>
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
                                <button className="button" onClick={() => handleXacNhanGiaoHang(order.madonhang)}>Xác Nhận</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleHuyDon(order.madonhang)}>Hủy Đơn</button>
                            </td>
                            <td>
                                <button className="btn btn-info" onClick={() => handleChiTiet(order.madonhang)}>Chi Tiết</button>
                            </td>

                        </tr>

                    ))}
                    {IsOpenChiTiet ? (
                        <p>sugfu</p>
                    ) : false}
                </tbody>
            </table>
        </>
    );
}

export default ListOrders;
