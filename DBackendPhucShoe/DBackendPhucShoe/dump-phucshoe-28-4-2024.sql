-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: phucshoe
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `MADONHANG` int(11) NOT NULL,
  `MASP` int(11) NOT NULL,
  `SOLUONG` int(11) NOT NULL,
  `THANHTIEN` decimal(10,2) NOT NULL,
  `TRANGTHAI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MADONHANG`,`MASP`),
  KEY `MASP` (`MASP`),
  CONSTRAINT `CHITIETDONHANG_ibfk_1` FOREIGN KEY (`MADONHANG`) REFERENCES `donhang` (`MADONHANG`),
  CONSTRAINT `CHITIETDONHANG_ibfk_2` FOREIGN KEY (`MASP`) REFERENCES `sanpham` (`MASP`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (52,33,1,375000.00,NULL),(58,30,0,30000.00,NULL),(73,30,1,375000.00,'Đã Giao Thành Công'),(173,30,1,375000.00,'Đã Giao Thành Công'),(180,76,2,330000.00,'Đã Giao Thành Công'),(182,35,3,1065000.00,'Đã Giao Thành Công'),(185,49,1,290000.00,'Đã Giao Thành Công'),(193,41,1,325000.00,'Đã Giao Thành Công'),(218,33,1,375000.00,NULL),(244,40,2,530000.00,NULL),(262,30,1,375000.00,NULL),(267,43,2,830000.00,NULL),(307,60,2,680000.00,NULL),(329,30,2,720000.00,'Đã Giao Thành Công'),(335,41,1,325000.00,'Đã Giao Thành Công'),(380,35,1,375000.00,NULL),(391,41,2,620000.00,'Đã Giao Thành Công'),(438,29,1,375000.00,'Đã Giao Thành Công'),(573,30,1,375000.00,'Đã Giao Thành Công'),(596,46,2,890000.00,NULL),(609,29,4,1410000.00,'Đã Giao Thành Công'),(671,37,7,2445000.00,NULL),(723,40,2,530000.00,'Đã Giao Thành Công'),(728,30,4,1410000.00,'Đã Giao Thành Công'),(741,30,1,375000.00,NULL),(802,32,3,915000.00,NULL),(836,30,2,720000.00,NULL),(880,30,1,375000.00,'Đã Giao Thành Công'),(935,72,2,630000.00,NULL),(963,71,1,330000.00,'Đã Giao Thành Công');
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MADONHANG` int(11) NOT NULL AUTO_INCREMENT,
  `MAKHACHHANG` int(11) DEFAULT NULL,
  `NGAYDONHANG` datetime DEFAULT NULL,
  `TRANGTHAI` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ChuaGiao',
  PRIMARY KEY (`MADONHANG`),
  KEY `MAKHACHHANG` (`MAKHACHHANG`),
  CONSTRAINT `DONHANG_ibfk_1` FOREIGN KEY (`MAKHACHHANG`) REFERENCES `khachhang` (`MAKHACHHANG`)
) ENGINE=InnoDB AUTO_INCREMENT=964 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (52,419,'2024-01-15 23:01:35','ChuaGiao'),(58,39,'2024-01-15 14:41:20','ChuaGiao'),(73,847,'2023-12-28 09:56:22','Đã Giao Thành Công'),(173,447,'2023-12-16 15:08:17','Đã Giao Thành Công'),(180,114,'2024-01-12 19:42:41','Đã Giao Thành Công'),(182,904,'2023-12-30 13:34:11','Đã Giao Thành Công'),(185,898,'2023-12-28 17:46:13','Đã Giao Thành Công'),(193,306,'2023-12-28 16:26:56','Đã Giao Thành Công'),(218,153,'2024-01-15 22:54:05','ChuaGiao'),(244,711,'2023-12-30 15:25:05','ChuaGiao'),(262,689,'2024-01-15 14:48:26','ChuaGiao'),(267,677,'2023-12-30 15:13:00','ChuaGiao'),(284,787,'2023-12-09 10:51:13','Đã Giao Thành Công'),(307,402,'2023-12-30 15:12:05','ChuaGiao'),(329,257,'2024-01-15 14:38:53','Đã Giao Thành Công'),(335,462,'2024-01-16 13:38:06','Đã Giao Thành Công'),(380,814,'2023-12-31 21:08:27','ChuaGiao'),(391,247,'2023-12-09 10:46:07','Đã Giao Thành Công'),(438,133,'2023-12-07 20:48:48','Đã Giao Thành Công'),(573,312,'2023-12-30 13:20:37','Đã Giao Thành Công'),(596,760,'2024-01-15 13:39:56','ChuaGiao'),(609,294,'2023-12-22 15:48:25','Đã Giao Thành Công'),(671,916,'2024-01-04 20:50:38','ChuaGiao'),(723,699,'2023-12-30 15:28:32','Đã Giao Thành Công'),(728,627,'2023-12-19 18:18:28','Đã Giao Thành Công'),(741,858,'2023-12-31 21:06:21','ChuaGiao'),(802,446,'2023-12-30 13:23:29','ChuaGiao'),(836,463,'2024-01-15 14:38:52','ChuaGiao'),(880,799,'2023-12-19 16:01:06','Đã Giao Thành Công'),(935,733,'2024-01-15 15:23:42','ChuaGiao'),(963,359,'2023-12-08 13:03:46','Đã Giao Thành Công');
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang`
--

DROP TABLE IF EXISTS `hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hang` (
  `MAHANG` int(11) NOT NULL AUTO_INCREMENT,
  `TENHANG` varchar(255) NOT NULL,
  PRIMARY KEY (`MAHANG`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang`
--

LOCK TABLES `hang` WRITE;
/*!40000 ALTER TABLE `hang` DISABLE KEYS */;
INSERT INTO `hang` VALUES (1,'Adonisss'),(2,'MWC'),(3,'Pack'),(4,'Niken'),(5,'a'),(6,'b'),(7,'Adios'),(18,'asdasd');
/*!40000 ALTER TABLE `hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MAKHACHHANG` int(11) NOT NULL AUTO_INCREMENT,
  `TEN` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DIACHI` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GHICHU` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SODIENTHOAI` varchar(20) DEFAULT NULL,
  `taikhoan` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`MAKHACHHANG`),
  KEY `taikhoan` (`taikhoan`),
  CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`taikhoan`) REFERENCES `users` (`taikhoan`)
) ENGINE=InnoDB AUTO_INCREMENT=967 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (21,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Trường Thọ, Huyện Cầu Ngang, Tỉnh Trà Vinh','nhanh nha shop','+84327434821',NULL),(26,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng','nhanh nha shop','+84327434821',NULL),(39,'Lê Thu Nguyệt','Số nhà 332 , Xã Khả Cửu, Huyện Thanh Sơn, Tỉnh Phú Thọ','không mua','0333333333',NULL),(41,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(114,'Lê Thu Nguyệt','Số nhà 332 , Phường 21, Quận Bình Thạnh, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(125,'Phan Văn Khánh','18 Đường 2/2, Phường Âu Cơ, Thị xã Phú Thọ, Tỉnh Phú Thọ','không có','0843212555',NULL),(133,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng','nhanh nha shop','+84327434821',NULL),(153,'Hoàng Phúc','12 đường Phạm Ngũ Lão, Xã Tả Phời, Thành phố Lào Cai, Tỉnh Lào Cai','','3274341281',NULL),(247,'Huy','18, Xã Kim Hòa, Huyện Cầu Ngang, Tỉnh Trà Vinh','nhanh nha shop','0327434821',NULL),(257,'Lê Thu Nguyệt','Số nhà 332 , Phường Sơn Kỳ, Quận Tân Phú, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(294,'Nhân','12 đường Phạm Ngũ Lão, Xã Bản Hon, Huyện Tam Đường, Tỉnh Lai Châu','không vỡ','+84327434821',NULL),(306,'Hồ Hoàng Phúc','Số nhà 18, Xã Kim Hòa, Huyện Cầu Ngang, Tỉnh Trà Vinh','Shop nhớ phản hồi sớm nhenn','0327434821',NULL),(312,'Phan Văn Khánh','18 Đường 2/2, Phường Âu Cơ, Thị xã Phú Thọ, Tỉnh Phú Thọ','không có','0843212555',NULL),(359,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Phường Vân Dương, Thành phố Bắc Ninh, Tỉnh Bắc Ninh','nhanh nha shop','+84327434821',NULL),(402,'Bùi Thị Khánh Vy','12 đường Phạm Ngũ Lão, Xã Hoành Mô, Huyện Bình Liêu, Tỉnh Quảng Ninh','không vỡ','0973222123',NULL),(405,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(414,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(419,'Hoàng Phúc','12 đường Phạm Ngũ Lão, Xã Tả Phời, Thành phố Lào Cai, Tỉnh Lào Cai','','0327434128',NULL),(446,'Kiều Thị Ái Mộng','18 Đường 2/2, Xã Tiên Lữ, Huyện Lập Thạch, Tỉnh Vĩnh Phúc','','0833285123',NULL),(447,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Mông Ân, Huyện Bảo Lâm, Tỉnh Cao Bằng','không vỡ','+8432743482',NULL),(462,'Co Vi','18 Đường 2/2, Xã Tú Xuyên, Huyện Văn Quan, Tỉnh Lạng Sơn','','0327434821',NULL),(463,'Lê Thu Nguyệt','Số nhà 332 , Phường Sơn Kỳ, Quận Tân Phú, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(556,NULL,NULL,NULL,NULL,'phuc'),(610,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(627,'Mỹ Kim ','18 Đường 2/2, Phường Giang Biên, Quận Long Biên, Thành phố Hà Nội','không vỡ','032111111','12321313'),(656,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333','abccc'),(662,'Bùi Cát Hải','Ấp Kim Câu, Xã Văn Hội, Huyện Ninh Giang, Tỉnh Hải Dương','không vỡ','094327',NULL),(668,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Vinh Quang, Huyện Vĩnh Bảo, Thành phố Hải Phòng','nhanh nha shop','+84327434821',NULL),(677,'Nguyễn Thị Thúy Hân','Số Nhà 512, Xã Châu Điền, Huyện Cầu Kè, Tỉnh Trà Vinh','Không có','0325444312',NULL),(689,'Lê Thu Nguyệt','Số nhà 332 , Xã Công Bằng, Huyện Pác Nặm, Tỉnh Bắc Kạn','không mua','0333333333',NULL),(699,'Nguyễn Thị Mỹ Huyền','Số nhà 13, Xã Tân Sơn, Huyện Trà Cú, Tỉnh Trà Vinh','dfhbfgh','0327434466',NULL),(711,'Nguyễn Thị Mỹ Huyền','Số nhà 13, Xã Tân Sơn, Huyện Trà Cú, Tỉnh Trà Vinh','dfhbfgh','0327434466',NULL),(733,'Lê Thu Nguyệt','Số nhà 332 , Xã Việt Hải, Huyện Cát Hải, Thành phố Hải Phòng','không mua','0333333333',NULL),(760,'Lê Thu Nguyệt','Số nhà 332 , Phường Tân Thuận Tây, Quận 7, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(781,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(787,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, undefined, undefined, Tỉnh Hà Giang','','+8432743482',NULL),(799,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Yên Định, Huyện Bắc Mê, Tỉnh Hà Giang','không vỡ','+84327434821',NULL),(814,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Tân Lập, Huyện Thanh Sơn, Tỉnh Phú Thọ','ádasd','0327434823',NULL),(847,'Cao Thị Ái Xuân','Ấp Kim Câu, Xã Văn Hội, Huyện Ninh Giang, Tỉnh Hải Dương','không vỡ','0943211562',NULL),(858,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Tả Sử Choóng, Huyện Hoàng Su Phì, Tỉnh Hà Giang','','0327434823',NULL),(880,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL),(898,'Nguyễn Tín Thành','Số nhà 20, Xã Ngọc Lâm, Huyện Thanh Chương, Tỉnh Nghệ An','Shop yêu dấu','0612444123',NULL),(904,'Trần Văn Thành','18 Đường 2/2, Xã Điệp Nông, Huyện Hưng Hà, Tỉnh Thái Bình','không vỡ','0632123333',NULL),(916,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã Chiềng Nơi, Huyện Mai Sơn, Tỉnh Sơn La','không vỡ','0327434821',NULL),(933,'Hoàng Phúc Hồ','12 đường Phạm Ngũ Lão, Xã An Bá, Huyện Sơn Động, Tỉnh Bắc Giang','không vỡ','+8432743482',NULL),(966,'Lê Thu Nguyệt','Số nhà 332 , undefined, undefined, Thành phố Hồ Chí Minh','không mua','0333333333',NULL);
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kichco`
--

DROP TABLE IF EXISTS `kichco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kichco` (
  `MAGIATRI` int(11) NOT NULL AUTO_INCREMENT,
  `GIATRI` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`MAGIATRI`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kichco`
--

LOCK TABLES `kichco` WRITE;
/*!40000 ALTER TABLE `kichco` DISABLE KEYS */;
INSERT INTO `kichco` VALUES (1,'37'),(2,'38'),(3,'39'),(4,'40'),(41,'35'),(42,'36'),(43,'99'),(44,'100');
/*!40000 ALTER TABLE `kichco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loai`
--

DROP TABLE IF EXISTS `loai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loai` (
  `MALOAI` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`MALOAI`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loai`
--

LOCK TABLES `loai` WRITE;
/*!40000 ALTER TABLE `loai` DISABLE KEYS */;
INSERT INTO `loai` VALUES (5,'Độc Đáo'),(13,'Thời Trang'),(15,'Nam'),(16,'Nữ'),(17,'Nam+1'),(18,'3d');
/*!40000 ALTER TABLE `loai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MASP` int(11) NOT NULL AUTO_INCREMENT,
  `TENSANPHAM` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MAHANG` int(11) NOT NULL,
  `GIA` decimal(10,2) NOT NULL,
  `giamgia` int(11) DEFAULT NULL,
  `description` text,
  `MALOAI` int(11) DEFAULT NULL,
  `MAGIATRI` int(11) NOT NULL,
  `SOLUONG` int(11) DEFAULT NULL,
  `THONGTINSANPHAM` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`MASP`),
  KEY `SANPHAM_ibfk_1` (`MALOAI`),
  KEY `SANPHAM_ibfk_2` (`MAHANG`),
  KEY `SANPHAM_ibfk_4` (`MAGIATRI`),
  CONSTRAINT `SANPHAM_ibfk_2` FOREIGN KEY (`MAHANG`) REFERENCES `hang` (`MAHANG`),
  CONSTRAINT `SANPHAM_ibfk_3` FOREIGN KEY (`MALOAI`) REFERENCES `loai` (`MALOAI`),
  CONSTRAINT `SANPHAM_ibfk_4` FOREIGN KEY (`MAGIATRI`) REFERENCES `kichco` (`MAGIATRI`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (26,'Giày MWC - T21A',2,345000.00,NULL,'profile_pic-1702011118624.jpg',15,2,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(29,'Giày MWC - NT83',2,345000.00,NULL,'profile_pic-1702011129020.jpg',15,1,2,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng chất liệu da tổng hợp phối màu, in chữ thời trang.  Đặc biệt sản phẩm sử dụng chất liệu da cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(30,'Giày MWC - NT80',2,345000.00,NULL,'profile_pic-1702012314938.jpg',15,3,0,'Giày được thiết kế dáng buộc dây năng động, mặt giày sử dụng vải dệt dầy dặn in ép nhiệt viền nổi ,đế EVA nhẹ nhàng thoải mái.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(31,'Giày MWC NT85',4,375000.00,NULL,'profile_pic-1702011166495.jpg',15,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(32,'Giày MWC NT32',1,295000.00,NULL,'profile_pic-1701869010936.jpg',13,3,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(33,'Giày MWC NT31',2,345000.00,NULL,'profile_pic-1701869062047.jpg',13,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(34,'Giày MWC NT30',1,345000.00,NULL,'profile_pic-1701869105575.jpg',13,4,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(35,'Giày MWC NT29',2,345000.00,NULL,'profile_pic-1701869159838.jpg',13,1,7,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(36,'Giày Pack NT28',3,275000.00,NULL,'profile_pic-1701869217542.jpg',5,41,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(37,'Giày Niken NT20',1,345000.00,NULL,'profile_pic-1701869291978.jpg',13,2,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(38,'Giày Adios NT19',7,345000.00,NULL,'profile_pic-1701942142165.jpg',13,1,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(39,'Giày boot nữ MWC NUBO- 9127',7,425000.00,NULL,'profile_pic-1701961267065.jpg',16,42,10,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(40,'Giày cao gót MWC NUCG- 4468',4,250000.00,NULL,'profile_pic-1701961364792.jpg',16,1,8,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(41,'Giày thể thao nữ MWC NUTT- A1',2,295000.00,NULL,'profile_pic-1701961442792.jpg',16,41,2,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng chất liệu da tổng hợp phối màu, in chữ thời trang.  Đặc biệt sản phẩm sử dụng chất liệu da cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(42,'Giày thể thao nữ MWC NUTT- A133',3,375000.00,NULL,'profile_pic-1701961516007.jpg',16,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(43,'Giày sục cao gót MWC NUCG- 4446',1,400000.00,NULL,'profile_pic-1701961741997.jpg',16,41,10,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(44,'Giày thể thao nữ MWC NUTT- A133',1,400000.00,NULL,'profile_pic-1701961778593.jpg',16,1,10,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(45,'Giày thể thao nữ MWC NUTT- A130',4,400000.00,NULL,'profile_pic-1701961853003.jpg',16,2,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(46,'Giày thể thao nữ MWC NUTT- W668',2,430000.00,NULL,'profile_pic-1701961905082.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(47,'Giày sandal nữ MWC NUSD- 2423',6,250000.00,NULL,'profile_pic-1701961964536.jpg',16,2,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(48,'Giày sandal nữ MWC NUSD- 2424',6,260000.00,NULL,'profile_pic-1701961994540.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(49,'Giày thể thao nữ MWC NUTT- A114',4,260000.00,NULL,'profile_pic-1701962018496.jpg',16,4,4,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(50,'Giày sandal nữ MWC NUSD- 2426 ',1,400000.00,NULL,'profile_pic-1701962064910.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(51,'Giày sandal nữ MWC NUSD- 2419',1,300000.00,NULL,'profile_pic-1701962101171.jpg',16,3,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(52,'Giày sandal nữ MWC NUSD- 2400',4,300000.00,NULL,'profile_pic-1701962194952.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(53,'Giày sandal nữ MWC NUSD- 2400',2,300000.00,NULL,'profile_pic-1701962329249.jpg',16,41,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(54,'Giày Oxford MWC NUOX- 9633',2,300000.00,NULL,'profile_pic-1701962413933.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(55,'Dép nữ MWC NUDE- 8333',2,345000.00,NULL,'profile_pic-1701962460645.jpg',16,3,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(56,'Dép nữ MWC NUDE- 8320 ',2,345000.00,NULL,'profile_pic-1701962550785.jpg',16,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(57,'Dép nữ MWC NUDE - 8291',5,345000.00,NULL,'profile_pic-1702013056947.jpg',16,2,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(58,'Giày sandal nữ MWC NUSD- 2420',2,325000.00,NULL,'profile_pic-1702013118453.jpg',16,1,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(59,'Giày Thể Thao Nam MWC - 539',1,325000.00,NULL,'profile_pic-1702013238947.jpg',15,41,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(60,'Giày Thể Thao Nam MWC - 540',2,325000.00,NULL,'profile_pic-1702013269445.jpg',15,1,10,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(61,'Giày Thể Thao Nam MWC NATT- 510',1,345000.00,NULL,'profile_pic-1702013307095.jpg',15,3,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(62,'Giày Thể Thao Nam MWC - 5417',2,345000.00,NULL,'profile_pic-1702013335738.jpg',15,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(63,'Giày Thể Thao Nam MWC NATT - 5419 ',1,250000.00,NULL,'profile_pic-1702013373958.jpg',15,41,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(64,'Giày Thể Thao Nam MWC NATT- 5425',1,300000.00,NULL,'profile_pic-1702013405888.jpg',15,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(65,'Giày Thể Thao Nam MWC - 5414 ',2,300000.00,NULL,'profile_pic-1702013468074.jpg',15,41,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(66,'Giày Thể Thao Nam MWC NATT- 5441',1,300000.00,NULL,'profile_pic-1702013527307.jpg',15,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(67,'Giày Thể Thao Nam MWC - 5385 ',1,550000.00,NULL,'profile_pic-1702013562057.jpg',5,4,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(68,'Giày Thể Thao Nam MWC NATT - 5309',2,550000.00,NULL,'profile_pic-1702013585397.jpg',5,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(69,'Giày thể thao nam MWC NATT- 5010',2,150000.00,NULL,'profile_pic-1702013630078.jpg',5,4,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(70,'Giày Thể Thao Nam MWC - 5418 ',1,150000.00,NULL,'profile_pic-1702013759694.jpg',15,1,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(71,'Giày Thể Thao Nam MWC NATT- 5427 ',2,300000.00,NULL,'profile_pic-1702013821705.jpg',15,1,19,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(72,'Giày Tây nam MWC - 6630 ',3,300000.00,NULL,'profile_pic-1702013873183.jpg',15,4,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(73,'Giày Thể Thao Nam MWC NATT- 5452',1,300000.00,NULL,'profile_pic-1702013997081.jpg',15,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(74,'Giày Thể Thao Nam MWC NATT - 5443 ',2,400000.00,NULL,'profile_pic-1702014033646.jpg',15,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(75,'Giày Thể Thao Nam MWC NATT- 5442',1,400000.00,NULL,'profile_pic-1702014056989.jpg',15,3,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(76,'Giày Thể Thao Nam MWC NATT - 5330',1,150000.00,NULL,'profile_pic-1702014093824.jpg',15,1,18,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(77,'Giày Thể Thao Nam MWC NATT- 5458 ',4,345000.00,NULL,'profile_pic-1702014133682.jpg',15,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(82,'Giày Thể Thao Nam MWC NATT - 533',1,345000.00,NULL,'profile_pic-1702473532969.jpg',15,3,20,'Giày được thiết kế dáng thắt dây năng động, mặt giày sử dụng da tổng hợp vân nổi thời trang, phối màu nhã nhặn.  Đặc biệt sản phẩm sử dụng chất liệu cao cấp có độ bền tối ưu giúp bạn thoải mái trong mọi hoàn cảnh.  Giày thoáng khí cả mặt trong lẫn mặt ngoài khiến người mang luôn cảm thấy dễ chịu dù hoạt động trong thời gian dài.'),(83,'Giày Sandal Nam MWC - 7027',1,215000.00,NULL,'profile_pic-1705334672451.jpg',15,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(84,'Giày thể thao nữ Adios NUTT- A144',2,315000.00,NULL,'profile_pic-1705383428310.jpg',16,4,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(85,'Giày thể thao nữ Niken NUTT- B11',1,315000.00,NULL,'profile_pic-1705383465739.jpg',16,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(86,'Giày cao gót Pack NUCG- 4443',2,315000.00,NULL,'profile_pic-1705383506383.jpg',16,3,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(87,'Giày Oxford Niken NUOX- 9635',1,315000.00,NULL,'profile_pic-1705383560469.jpg',16,1,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.'),(88,'Giày sandal nữ Niken NUSD- 2454',1,305000.00,NULL,'profile_pic-1705383625789.jpg',16,2,20,'Giày thiết kế với cổ cao phối dây kéo sau gót ôm chân, sử dụng chất liệu da tổng hợp êm mềm thời trang.  Phần gót không quá cao cũng không quá thấp, vừa đủ để tôn lên dáng người của nàng mà lại rất dễ dàng di chuyển, giày vừa ấm, vừa thời trang lại tôn dáng.  Boot cao cổ chính là best seller cho các cô nàng yêu thích phong cách trẻ trung thời thượng, sang chảnh.');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `taikhoan` varchar(255) NOT NULL,
  `matkhau` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`taikhoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('12321313','$2b$10$Vr/DhM4SKxRbJpG0BO8mTefYgoo0QBXOJj6BVlUEUSRYkBAGRZWCy'),('abccc','$2b$10$fBTCCben0J0y9yuDzUDBCeauHbsQCOieMNATLyFkN5LVaVp1O7a8.'),('phuc','$2b$10$OqsX47PR9oKnNKwQjC.HHeMOJpRgh4jCTg3UiUDG5NOqkNKOjSiFS');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'phucshoe'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 21:21:48
