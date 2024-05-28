// NoiDungTuyenDung.js

import React from "react";
import "../assets/styles/NoiDungTuyenDung.css"; // Đường dẫn đến file CSS của bạn
import bannerImage from "../assets/image-logo/banner1.png";
import bannerImage2 from "../assets/image-logo/banner2.png";
function NoiDungTuyenDung() {
    return (
        <div className="container-tuyendung">


            <h1>TUYỂN DỤNG - THỰC TẬP SINH KINH DOANH DỊCH VỤ MARKETING</h1>

            <p> Ngày đăng: 07/12/2023</p>

            <h4>Chào các bạn yêu giày,</h4>
            <p><span className="logotuyendung">PhucShoe</span>, một thương hiệu giày nổi tiếng và đang phát triển mạnh mẽ,
                hiện đang mở cửa để chào đón các bạn trẻ năng động và đam mê marketing tham gia
                vào đội ngũ của chúng tôi. Hãy cùng nhau xây dựng sự thành công
                và lan tỏa đam mê giày đến cộng đồng.</p>

            <p> Vị Trí: Thực Tập Sinh Kinh Doanh Dịch Vụ Marketing</p>
            <img
                src={bannerImage} // Sử dụng biến đã import để đặt đường dẫn
                alt="Banner"
                className="banner-image"
            />
            <div className="job-description">
                <h4>Mô Tả Công Việc:</h4>
                <ul>
                    <li>Tìm kiếm và tư vấn khách hàng có nhu cầu về giày dép, cả offline và online.</li>
                    <li>Phát triển kế hoạch marketing sáng tạo và hiệu quả cho cửa hàng.</li>
                    <li>Xây dựng và duy trì mối quan hệ khách hàng, hỗ trợ chăm sóc doanh nghiệp và chủ shop.</li>
                    <li>Điều phối công việc với bộ phận thực hiện marketing để giải quyết nhanh chóng mọi khúc mắc của khách hàng.</li>
                </ul>
            </div>

            <div className="requirements">
                <h4>Yêu Cầu:</h4>
                <ul>
                    <li>Không yêu cầu kinh nghiệm.</li>
                    <li>Kỹ năng giao tiếp tốt và xử lý tình huống linh hoạt.</li>
                    <li>Chăm chỉ, kiên trì và ham học hỏi.</li>
                    <li>Có xe máy và laptop cá nhân.</li>
                </ul>
            </div>
            <img
                src={bannerImage2} // Sử dụng biến đã import để đặt đường dẫn
                alt="Banner"
                className="banner-image"
            />
            <div className="benefits">
                <h4>Quyền Lợi và Chế Độ:</h4>
                <ul>
                    <li>Hỗ trợ thu nhập: 20% doanh số + phụ cấp ăn trưa.</li>
                    <li>Được đào tạo chuyên sâu về thương mại điện tử và các kỹ năng mềm.</li>
                    <li>Cơ hội tiếp cận các kênh digital marketing như SEO, Google Ads, Facebook Ads, TikTok Ads.</li>
                    <li>Lộ trình phát triển và thăng tiến cụ thể.</li>
                    <li>Gia nhập đội ngũ nhân viên trẻ trung, năng động.</li>
                </ul>
            </div>

            <div className="working-hours">
                <h4>Thời Gian Làm Việc:</h4>
                <p>8h30 - 17h30 từ thứ 2 - thứ 6 và hai ngày thứ 7 đầu và cuối tháng.</p>
            </div>

            <div className="working-location">
                <h4>Địa Điểm Làm Việc:</h4>
                <p>[ĐỊA CHỈ CỤ THỂ CỦA SHOP CỦA BẠN]</p>
            </div>

            <div className="how-to-apply">
                <p>Nếu bạn đang tìm kiếm cơ hội thực tập có ý nghĩa và muốn thách thức bản thân trong môi trường năng động của ngành thời trang, hãy gửi hồ sơ của bạn ngay hôm nay!</p>
                <p>Gửi hồ sơ về địa chỉ email: [ĐỊA CHỈ EMAIL TUYỂN DỤNG]</p>
            </div>

            <div className="closing-remarks">
                <p>Chúng tôi mong đợi được hợp tác và xây dựng sự thành công cùng nhau. Cảm ơn các bạn đã quan tâm đến <span className="logotuyendung">PhucShoe</span> </p>
            </div>


            <button className="apply-button">Nộp Đơn</button>

            <div className="footer">
                <p>&copy; {new Date().getFullYear()} PhucShoe. All rights reserved.</p>
            </div>
        </div>
    );
}

export default NoiDungTuyenDung;
