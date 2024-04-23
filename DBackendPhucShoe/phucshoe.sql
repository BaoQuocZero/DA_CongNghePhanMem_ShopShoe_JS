-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 21, 2024 lúc 05:44 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `phucshoe`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `MADONHANG` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `SOLUONG` int(11) NOT NULL,
  `THANHTIEN` decimal(10,2) NOT NULL,
  `TRANGTHAI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`MADONHANG`, `MASP`, `SOLUONG`, `THANHTIEN`, `TRANGTHAI`) VALUES
(52, 33, 1, 375000.00, NULL),
(58, 30, 0, 30000.00, NULL),
(73, 30, 1, 375000.00, 'Đã Giao Thành Công'),
(173, 30, 1, 375000.00, 'Đã Giao Thành Công'),
(180, 76, 2, 330000.00, 'Đã Giao Thành Công'),
(182, 35, 3, 1065000.00, 'Đã Giao Thành Công'),
(185, 49, 1, 290000.00, 'Đã Giao Thành Công'),
(193, 41, 1, 325000.00, 'Đã Giao Thành Công'),
(218, 33, 1, 375000.00, NULL),
(244, 40, 2, 530000.00, NULL),
(262, 30, 1, 375000.00, NULL),
(267, 43, 2, 830000.00, NULL),
(307, 60, 2, 680000.00, NULL),
(329, 30, 2, 720000.00, 'Đã Giao Thành Công'),
(335, 41, 1, 325000.00, 'Đã Giao Thành Công'),
(380, 35, 1, 375000.00, NULL),
(391, 41, 2, 620000.00, 'Đã Giao Thành Công'),
(438, 29, 1, 375000.00, 'Đã Giao Thành Công'),
(573, 30, 1, 375000.00, 'Đã Giao Thành Công'),
(596, 46, 2, 890000.00, NULL),
(609, 29, 4, 1410000.00, 'Đã Giao Thành Công'),
(671, 37, 7, 2445000.00, NULL),
(723, 40, 2, 530000.00, 'Đã Giao Thành Công'),
(728, 30, 4, 1410000.00, 'Đã Giao Thành Công'),
(741, 30, 1, 375000.00, NULL),
(802, 32, 3, 915000.00, NULL),
(836, 30, 2, 720000.00, NULL),
(880, 30, 1, 375000.00, 'Đã Giao Thành Công'),
(935, 72, 2, 630000.00, NULL),
(963, 71, 1, 330000.00, 'Đã Giao Thành Công');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `MADONHANG` int(11) NOT NULL,
  `MAKHACHHANG` int(11) DEFAULT NULL,
  `NGAYDONHANG` datetime DEFAULT NULL,
  `TRANGTHAI` varchar(255) NOT NULL DEFAULT 'ChuaGiao'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`MADONHANG`, `MAKHACHHANG`, `NGAYDONHANG`, `TRANGTHAI`) VALUES
(52, 419, '2024-01-15 23:01:35', 'ChuaGiao'),
(58, 39, '2024-01-15 14:41:20', 'ChuaGiao'),
(73, 847, '2023-12-28 09:56:22', 'Đã Giao Thành Công'),
(173, 447, '2023-12-16 15:08:17', 'Đã Giao Thành Công'),
(180, 114, '2024-01-12 19:42:41', 'Đã Giao Thành Công'),
(182, 904, '2023-12-30 13:34:11', 'Đã Giao Thành Công'),
(185, 898, '2023-12-28 17:46:13', 'Đã Giao Thành Công'),
(193, 306, '2023-12-28 16:26:56', 'Đã Giao Thành Công'),
(218, 153, '2024-01-15 22:54:05', 'ChuaGiao'),
(244, 711, '2023-12-30 15:25:05', 'ChuaGiao'),
(262, 689, '2024-01-15 14:48:26', 'ChuaGiao'),
(267, 677, '2023-12-30 15:13:00', 'ChuaGiao'),
(284, 787, '2023-12-09 10:51:13', 'Đã Giao Thành Công'),
(307, 402, '2023-12-30 15:12:05', 'ChuaGiao'),
(329, 257, '2024-01-15 14:38:53', 'Đã Giao Thành Công'),
(335, 462, '2024-01-16 13:38:06', 'Đã Giao Thành Công'),
(380, 814, '2023-12-31 21:08:27', 'ChuaGiao'),
(391, 247, '2023-12-09 10:46:07', 'Đã Giao Thành Công'),
(438, 133, '2023-12-07 20:48:48', 'Đã Giao Thành Công'),
(573, 312, '2023-12-30 13:20:37', 'Đã Giao Thành Công'),
(596, 760, '2024-01-15 13:39:56', 'ChuaGiao'),
(609, 294, '2023-12-22 15:48:25', 'Đã Giao Thành Công'),
(671, 916, '2024-01-04 20:50:38', 'ChuaGiao'),
(723, 699, '2023-12-30 15:28:32', 'Đã Giao Thành Công'),
(728, 627, '2023-12-19 18:18:28', 'Đã Giao Thành Công'),
(741, 858, '2023-12-31 21:06:21', 'ChuaGiao'),
(802, 446, '2023-12-30 13:23:29', 'ChuaGiao'),
(836, 463, '2024-01-15 14:38:52', 'ChuaGiao'),
(880, 799, '2023-12-19 16:01:06', 'Đã Giao Thành Công'),
(935, 733, '2024-01-15 15:23:42', 'ChuaGiao'),
(963, 359, '2023-12-08 13:03:46', 'Đã Giao Thành Công');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hang`
--

CREATE TABLE `hang` (
  `TENHANG` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `hang`
--

INSERT INTO `hang` (`TENHANG`) VALUES
('Adios'),
('Centreripack'),
('MWC'),
('Niken'),
('Pack'),
('PhucShoe');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MAKHACHHANG` int(11) NOT NULL,
  `TEN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIACHI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GHICHU` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SODIENTHOAI` varchar(20) DEFAULT NULL,
  `taikhoan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MAKHACHHANG`, `TEN`, `DIACHI`, `GHICHU`, `SODIENTHOAI`, `taikhoan`) VALUES
(21, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Trường Thọ, Huyện Cầu Ngang, Tỉnh Trà Vinh', 'nhanh nha shop', '+84327434821', NULL),
(26, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng', 'nhanh nha shop', '+84327434821', NULL),
(39, 'Lê Thu Nguyệt', 'Số nhà 332 , Xã Khả Cửu, Huyện Thanh Sơn, Tỉnh Phú Thọ', 'không mua', '0333333333', NULL),
(41, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(114, 'Lê Thu Nguyệt', 'Số nhà 332 , Phường 21, Quận Bình Thạnh, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(125, 'Phan Văn Khánh', '18 Đường 2/2, Phường Âu Cơ, Thị xã Phú Thọ, Tỉnh Phú Thọ', 'không có', '0843212555', NULL),
(133, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng', 'nhanh nha shop', '+84327434821', NULL),
(153, 'Hoàng Phúc', '12 đường Phạm Ngũ Lão, Xã Tả Phời, Thành phố Lào Cai, Tỉnh Lào Cai', '', '3274341281', NULL),
(247, 'Huy', '18, Xã Kim Hòa, Huyện Cầu Ngang, Tỉnh Trà Vinh', 'nhanh nha shop', '0327434821', NULL),
(257, 'Lê Thu Nguyệt', 'Số nhà 332 , Phường Sơn Kỳ, Quận Tân Phú, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(294, 'Nhân', '12 đường Phạm Ngũ Lão, Xã Bản Hon, Huyện Tam Đường, Tỉnh Lai Châu', 'không vỡ', '+84327434821', NULL),
(306, 'Hồ Hoàng Phúc', 'Số nhà 18, Xã Kim Hòa, Huyện Cầu Ngang, Tỉnh Trà Vinh', 'Shop nhớ phản hồi sớm nhenn', '0327434821', NULL),
(312, 'Phan Văn Khánh', '18 Đường 2/2, Phường Âu Cơ, Thị xã Phú Thọ, Tỉnh Phú Thọ', 'không có', '0843212555', NULL),
(359, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Phường Vân Dương, Thành phố Bắc Ninh, Tỉnh Bắc Ninh', 'nhanh nha shop', '+84327434821', NULL),
(402, 'Bùi Thị Khánh Vy', '12 đường Phạm Ngũ Lão, Xã Hoành Mô, Huyện Bình Liêu, Tỉnh Quảng Ninh', 'không vỡ', '0973222123', NULL),
(405, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(414, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(419, 'Hoàng Phúc', '12 đường Phạm Ngũ Lão, Xã Tả Phời, Thành phố Lào Cai, Tỉnh Lào Cai', '', '0327434128', NULL),
(446, 'Kiều Thị Ái Mộng', '18 Đường 2/2, Xã Tiên Lữ, Huyện Lập Thạch, Tỉnh Vĩnh Phúc', '', '0833285123', NULL),
(447, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Mông Ân, Huyện Bảo Lâm, Tỉnh Cao Bằng', 'không vỡ', '+8432743482', NULL),
(462, 'Co Vi', '18 Đường 2/2, Xã Tú Xuyên, Huyện Văn Quan, Tỉnh Lạng Sơn', '', '0327434821', NULL),
(463, 'Lê Thu Nguyệt', 'Số nhà 332 , Phường Sơn Kỳ, Quận Tân Phú, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(610, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(627, 'Mỹ Kim ', '18 Đường 2/2, Phường Giang Biên, Quận Long Biên, Thành phố Hà Nội', 'không vỡ', '032111111', NULL),
(656, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(662, 'Bùi Cát Hải', 'Ấp Kim Câu, Xã Văn Hội, Huyện Ninh Giang, Tỉnh Hải Dương', 'không vỡ', '094327', NULL),
(668, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng', 'nhanh nha shop', '+84327434821', NULL),
(677, 'Nguyễn Thị Thúy Hân', 'Số Nhà 512, Xã Châu Điền, Huyện Cầu Kè, Tỉnh Trà Vinh', 'Không có', '0325444312', NULL),
(689, 'Lê Thu Nguyệt', 'Số nhà 332 , Xã Công Bằng, Huyện Pác Nặm, Tỉnh Bắc Kạn', 'không mua', '0333333333', NULL),
(699, 'Nguyễn Thị Mỹ Huyền', 'Số nhà 13, Xã Tân Sơn, Huyện Trà Cú, Tỉnh Trà Vinh', 'dfhbfgh', '0327434466', NULL),
(711, 'Nguyễn Thị Mỹ Huyền', 'Số nhà 13, Xã Tân Sơn, Huyện Trà Cú, Tỉnh Trà Vinh', 'dfhbfgh', '0327434466', NULL),
(733, 'Lê Thu Nguyệt', 'Số nhà 332 , Xã Việt Hải, Huyện Cát Hải, Thành phố Hải Phòng', 'không mua', '0333333333', NULL),
(760, 'Lê Thu Nguyệt', 'Số nhà 332 , Phường Tân Thuận Tây, Quận 7, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(781, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(787, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, undefined, undefined, Tỉnh Hà Giang', '', '+8432743482', NULL),
(799, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Yên Định, Huyện Bắc Mê, Tỉnh Hà Giang', 'không vỡ', '+84327434821', NULL),
(814, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Tân Lập, Huyện Thanh Sơn, Tỉnh Phú Thọ', 'ádasd', '0327434823', NULL),
(847, 'Cao Thị Ái Xuân', 'Ấp Kim Câu, Xã Văn Hội, Huyện Ninh Giang, Tỉnh Hải Dương', 'không vỡ', '0943211562', NULL),
(858, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Tả Sử Choóng, Huyện Hoàng Su Phì, Tỉnh Hà Giang', '', '0327434823', NULL),
(880, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL),
(898, 'Nguyễn Tín Thành', 'Số nhà 20, Xã Ngọc Lâm, Huyện Thanh Chương, Tỉnh Nghệ An', 'Shop yêu dấu', '0612444123', NULL),
(904, 'Trần Văn Thành', '18 Đường 2/2, Xã Điệp Nông, Huyện Hưng Hà, Tỉnh Thái Bình', 'không vỡ', '0632123333', NULL),
(916, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã Chiềng Nơi, Huyện Mai Sơn, Tỉnh Sơn La', 'không vỡ', '0327434821', NULL),
(933, 'Hoàng Phúc Hồ', '12 đường Phạm Ngũ Lão, Xã An Bá, Huyện Sơn Động, Tỉnh Bắc Giang', 'không vỡ', '+8432743482', NULL),
(966, 'Lê Thu Nguyệt', 'Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh', 'không mua', '0333333333', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `kichco`
--

CREATE TABLE `kichco` (
  `GIATRI` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `kichco`
--

INSERT INTO `kichco` (`GIATRI`) VALUES
('37'),
('38'),
('39'),
('40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `loai`
--

CREATE TABLE `loai` (
  `MALOAI` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `loai`
--

INSERT INTO `loai` (`MALOAI`, `name`) VALUES
(5, 'Độc Đáo'),
(13, 'Thời Trang'),
(15, 'Nam'),
(16, 'Nữ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MASP` int(11) NOT NULL,
  `TENSANPHAM` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TENHANG` varchar(255) DEFAULT NULL,
  `GIA` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `MALOAI` int(11) DEFAULT NULL,
  `GIATRI` varchar(10) DEFAULT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `THONGTINSANPHAM` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MASP`, `TENSANPHAM`, `TENHANG`, `GIA`, `description`, `MALOAI`, `GIATRI`, `SOLUONG`, `THONGTINSANPHAM`) VALUES
(26, 'Giày MWC - T21A', 'MWC', 345000.00, 'profile_pic-1702011118624.jpg', 15, '38', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(29, 'Giày MWC - NT83', 'MWC', 345000.00, 'profile_pic-1702011129020.jpg', 15, '39', 2, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng chất liệu da tổng hợp phối màu, in chữ thời trang.  Đặc biệt sản phẩm sử dụng chất liệu da cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(30, 'Giày MWC - NT80', 'MWC', 345000.00, 'profile_pic-1702012314938.jpg', 15, '38', 0, 'Giày được thiết kế dáng buộc dây năng động, mặt giày sử dụng vải dệt dầy dặn in ép nhiệt viền nổi ,đế EVA nhẹ nhàng thoải mái.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(31, 'Giày MWC NT85', 'MWC', 375000.00, 'profile_pic-1702011166495.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(32, 'Giày MWC NT32', 'MWC', 295000.00, 'profile_pic-1701869010936.jpg', 13, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(33, 'Giày MWC NT31', 'MWC', 345000.00, 'profile_pic-1701869062047.jpg', 13, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(34, 'Giày MWC NT30', 'MWC', 345000.00, 'profile_pic-1701869105575.jpg', 13, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(35, 'Giày MWC NT29', 'MWC', 345000.00, 'profile_pic-1701869159838.jpg', 13, '38', 7, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(36, 'Giày Pack NT28', 'Pack', 275000.00, 'profile_pic-1701869217542.jpg', 5, '40', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(37, 'Giày Niken NT20', 'Centreripack', 345000.00, 'profile_pic-1701869291978.jpg', 13, '40', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(38, 'Giày Adios NT19', 'Adios', 345000.00, 'profile_pic-1701942142165.jpg', 13, '40', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(39, 'Giày boot nữ MWC NUBO- 9127', 'MWC', 425000.00, 'profile_pic-1701961267065.jpg', 16, '40', 10, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(40, 'Giày cao gót MWC NUCG- 4468', 'MWC', 250000.00, 'profile_pic-1701961364792.jpg', 16, '39', 8, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(41, 'Giày thể thao nữ MWC NUTT- A1', 'MWC', 295000.00, 'profile_pic-1701961442792.jpg', 16, '37', 2, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng chất liệu da tổng hợp phối màu, in chữ thời trang.  Đặc biệt sản phẩm sử dụng chất liệu da cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(42, 'Giày thể thao nữ MWC NUTT- A133', 'MWC', 375000.00, 'profile_pic-1701961516007.jpg', 16, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(43, 'Giày sục cao gót MWC NUCG- 4446', 'MWC', 400000.00, 'profile_pic-1701961741997.jpg', 16, '40', 10, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(44, 'Giày thể thao nữ MWC NUTT- A133', 'MWC', 400000.00, 'profile_pic-1701961778593.jpg', 16, '37', 10, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(45, 'Giày thể thao nữ MWC NUTT- A130', 'MWC', 400000.00, 'profile_pic-1701961853003.jpg', 16, '40', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(46, 'Giày thể thao nữ MWC NUTT- W668', 'MWC', 430000.00, 'profile_pic-1701961905082.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(47, 'Giày sandal nữ MWC NUSD- 2423', 'MWC', 250000.00, 'profile_pic-1701961964536.jpg', 16, '38', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(48, 'Giày sandal nữ MWC NUSD- 2424', 'MWC', 260000.00, 'profile_pic-1701961994540.jpg', 16, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(49, 'Giày thể thao nữ MWC NUTT- A114', 'Adios', 260000.00, 'profile_pic-1701962018496.jpg', 16, '37', 4, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(50, 'Giày sandal nữ MWC NUSD- 2426 ', 'MWC', 400000.00, 'profile_pic-1701962064910.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(51, 'Giày sandal nữ MWC NUSD- 2419', 'MWC', 300000.00, 'profile_pic-1701962101171.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(52, 'Giày sandal nữ MWC NUSD- 2400', 'MWC', 300000.00, 'profile_pic-1701962194952.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(53, 'Giày sandal nữ MWC NUSD- 2400', 'MWC', 300000.00, 'profile_pic-1701962329249.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(54, 'Giày Oxford MWC NUOX- 9633', 'MWC', 300000.00, 'profile_pic-1701962413933.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(55, 'Dép nữ MWC NUDE- 8333', 'Adios', 345000.00, 'profile_pic-1701962460645.jpg', 16, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(56, 'Dép nữ MWC NUDE- 8320 ', 'MWC', 345000.00, 'profile_pic-1701962550785.jpg', 16, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(57, 'Dép nữ MWC NUDE - 8291', 'MWC', 345000.00, 'profile_pic-1702013056947.jpg', 16, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(58, 'Giày sandal nữ MWC NUSD- 2420', 'MWC', 325000.00, 'profile_pic-1702013118453.jpg', 16, '37', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(59, 'Giày Thể Thao Nam MWC - 539', 'MWC', 325000.00, 'profile_pic-1702013238947.jpg', 15, '39', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(60, 'Giày Thể Thao Nam MWC - 540', 'MWC', 325000.00, 'profile_pic-1702013269445.jpg', 15, '39', 10, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(61, 'Giày Thể Thao Nam MWC NATT- 510', 'MWC', 345000.00, 'profile_pic-1702013307095.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(62, 'Giày Thể Thao Nam MWC - 5417', 'MWC', 345000.00, 'profile_pic-1702013335738.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(63, 'Giày Thể Thao Nam MWC NATT - 5419 ', 'MWC', 250000.00, 'profile_pic-1702013373958.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(64, 'Giày Thể Thao Nam MWC NATT- 5425', 'MWC', 300000.00, 'profile_pic-1702013405888.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(65, 'Giày Thể Thao Nam MWC - 5414 ', 'MWC', 300000.00, 'profile_pic-1702013468074.jpg', 15, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(66, 'Giày Thể Thao Nam MWC NATT- 5441', 'MWC', 300000.00, 'profile_pic-1702013527307.jpg', 15, '37', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(67, 'Giày Thể Thao Nam MWC - 5385 ', 'Adios', 550000.00, 'profile_pic-1702013562057.jpg', 5, '37', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(68, 'Giày Thể Thao Nam MWC NATT - 5309', 'Adios', 550000.00, 'profile_pic-1702013585397.jpg', 5, '37', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(69, 'Giày thể thao nam MWC NATT- 5010', 'Adios', 150000.00, 'profile_pic-1702013630078.jpg', 5, '37', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(70, 'Giày Thể Thao Nam MWC - 5418 ', 'MWC', 150000.00, 'profile_pic-1702013759694.jpg', 15, '40', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(71, 'Giày Thể Thao Nam MWC NATT- 5427 ', 'MWC', 300000.00, 'profile_pic-1702013821705.jpg', 15, '40', 19, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(72, 'Giày Tây nam MWC - 6630 ', 'MWC', 300000.00, 'profile_pic-1702013873183.jpg', 15, '39', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(73, 'Giày Thể Thao Nam MWC NATT- 5452', 'MWC', 300000.00, 'profile_pic-1702013997081.jpg', 15, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(74, 'Giày Thể Thao Nam MWC NATT - 5443 ', 'MWC', 400000.00, 'profile_pic-1702014033646.jpg', 15, '39', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(75, 'Giày Thể Thao Nam MWC NATT- 5442', 'MWC', 400000.00, 'profile_pic-1702014056989.jpg', 15, '39', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(76, 'Giày Thể Thao Nam MWC NATT - 5330', 'MWC', 150000.00, 'profile_pic-1702014093824.jpg', 15, '40', 18, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(77, 'Giày Thể Thao Nam MWC NATT- 5458 ', 'MWC', 345000.00, 'profile_pic-1702014133682.jpg', 15, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(82, 'Giày Thể Thao Nam MWC NATT - 533', 'MWC', 345000.00, 'profile_pic-1702473532969.jpg', 15, '39', 20, 'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),
(83, 'Giày Sandal Nam MWC - 7027', 'MWC', 215000.00, 'profile_pic-1705334672451.jpg', 15, '37', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(84, 'Giày thể thao nữ Adios NUTT- A144', 'Adios', 315000.00, 'profile_pic-1705383428310.jpg', 16, '39', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(85, 'Giày thể thao nữ Niken NUTT- B11', 'Adios', 315000.00, 'profile_pic-1705383465739.jpg', 16, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(86, 'Giày cao gót Pack NUCG- 4443', 'Pack', 315000.00, 'profile_pic-1705383506383.jpg', 16, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(87, 'Giày Oxford Niken NUOX- 9635', 'Niken', 315000.00, 'profile_pic-1705383560469.jpg', 16, '40', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),
(88, 'Giày sandal nữ Niken NUSD- 2454', 'Niken', 305000.00, 'profile_pic-1705383625789.jpg', 16, '39', 20, 'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `taikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`taikhoan`, `matkhau`) VALUES
('12321313', '$2b$10$Vr/DhM4SKxRbJpG0BO8mTefYgoo0QBXOJj6BVlUEUSRYkBAGRZWCy'),
('123213131111', '$2b$10$QkaAw8lm2aKKAjC5gDK7BOi0TuKVzc2qMObPyWShUEJV5p3LU1JTW'),
('abc', '123123');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD PRIMARY KEY (`MADONHANG`,`MASP`),
  ADD KEY `MASP` (`MASP`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`MADONHANG`),
  ADD KEY `MAKHACHHANG` (`MAKHACHHANG`);

--
-- Chỉ mục cho bảng `hang`
--
ALTER TABLE `hang`
  ADD PRIMARY KEY (`TENHANG`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MAKHACHHANG`);

--
-- Chỉ mục cho bảng `kichco`
--
ALTER TABLE `kichco`
  ADD PRIMARY KEY (`GIATRI`);

--
-- Chỉ mục cho bảng `loai`
--
ALTER TABLE `loai`
  ADD PRIMARY KEY (`MALOAI`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MASP`),
  ADD KEY `GIATRI` (`GIATRI`),
  ADD KEY `SANPHAM_ibfk_2` (`TENHANG`),
  ADD KEY `SANPHAM_ibfk_1` (`MALOAI`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`taikhoan`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `donhang`
--
ALTER TABLE `donhang`
  MODIFY `MADONHANG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=964;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MAKHACHHANG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=967;

--
-- AUTO_INCREMENT cho bảng `loai`
--
ALTER TABLE `loai`
  MODIFY `MALOAI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MASP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `CHITIETDONHANG_ibfk_1` FOREIGN KEY (`MADONHANG`) REFERENCES `donhang` (`MADONHANG`),
  ADD CONSTRAINT `CHITIETDONHANG_ibfk_2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`);

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`MAKHACHHANG`) REFERENCES `khachhang` (`MAKHACHHANG`);

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `SANPHAM_ibfk_1` FOREIGN KEY (`MALOAI`) REFERENCES `loai` (`MALOAI`),
  ADD CONSTRAINT `SANPHAM_ibfk_2` FOREIGN KEY (`TENHANG`) REFERENCES `hang` (`TENHANG`),
  ADD CONSTRAINT `SANPHAM_ibfk_3` FOREIGN KEY (`GIATRI`) REFERENCES `kichco` (`GIATRI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
