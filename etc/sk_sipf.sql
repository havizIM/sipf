-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Okt 2019 pada 15.41
-- Versi server: 10.4.8-MariaDB
-- Versi PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sk_sipf`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id_customer` varchar(11) NOT NULL,
  `nama_perusahaan` varchar(30) NOT NULL,
  `nama_pic` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telepon` varchar(12) NOT NULL,
  `bank` varchar(10) NOT NULL,
  `cabang` varchar(20) NOT NULL,
  `no_rekening` varchar(20) NOT NULL,
  `nama_marketing` varchar(30) NOT NULL,
  `tgl_input_customer` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id_customer`, `nama_perusahaan`, `nama_pic`, `email`, `telepon`, `bank`, `cabang`, `no_rekening`, `nama_marketing`, `tgl_input_customer`) VALUES
('CUST-000001', 'PT. AAA ', 'Dian Ratna Sari', 'aaa@gmail.com', '123123123', 'BCA', 'Jembatan Lima', '123123123123', 'Cobaaaa', '2019-10-18 15:18:25'),
('CUST-000002', 'PT ERLANGGA', 'Sinta', 'sinta@gmail.com', '08971234667', 'bca', 'biak', '544799687', 'Cobaaa', '2019-10-18 16:12:19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment`
--

CREATE TABLE `payment` (
  `no_payment` varchar(11) NOT NULL,
  `id_customer` varchar(11) NOT NULL,
  `id_user` varchar(11) NOT NULL,
  `tgl_payment` date NOT NULL,
  `total_bayar` int(11) NOT NULL,
  `tgl_input_payment` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `payment`
--

INSERT INTO `payment` (`no_payment`, `id_customer`, `id_user`, `tgl_payment`, `total_bayar`, `tgl_input_payment`) VALUES
('PY-1019-001', 'CUST-000001', 'USR-0000003', '2019-10-18', 7500000, '2019-10-18 15:21:39'),
('PY-1019-002', 'CUST-000002', 'USR-0000003', '2019-10-18', 1000000, '2019-10-18 16:16:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_detail`
--

CREATE TABLE `payment_detail` (
  `no_payment` varchar(11) NOT NULL,
  `no_po` varchar(11) NOT NULL,
  `jml_dibayar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `payment_detail`
--

INSERT INTO `payment_detail` (`no_payment`, `no_po`, `jml_dibayar`) VALUES
('PY-1019-001', 'PO-AAA-001', 7500000),
('PY-1019-002', 'PO-ER-001', 1000000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `purchase_order`
--

CREATE TABLE `purchase_order` (
  `no_po` varchar(11) NOT NULL,
  `id_customer` varchar(11) NOT NULL,
  `id_user` varchar(11) NOT NULL,
  `file_po` text NOT NULL,
  `total_po` int(11) NOT NULL,
  `total_fee` int(11) NOT NULL,
  `tgl_input_po` timestamp NOT NULL DEFAULT current_timestamp(),
  `marketing` varchar(30) NOT NULL,
  `approve` enum('T','Y') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `purchase_order`
--

INSERT INTO `purchase_order` (`no_po`, `id_customer`, `id_user`, `file_po`, `total_po`, `total_fee`, `tgl_input_po`, `marketing`, `approve`) VALUES
('PO-AAA-001', 'CUST-000001', 'USR-0000002', 'a8653a03b611c6e851935372814e9f4c.png', 150000000, 7500000, '2019-10-18 15:19:29', '', 'Y'),
('PO-AAA-003', 'CUST-000001', 'USR-0000002', 'cb45784a41318cb74adbed344ac497c2.jpg', 50000000, 1000000, '2019-10-18 15:49:53', '', 'T'),
('PO-AAA-123', 'CUST-000001', 'USR-0000002', '5c1715397830f7473b23bb3f2dcb0cf8.jpg', 30000000, 1500000, '2019-10-18 15:46:06', '', 'Y'),
('PO-ER-001', 'CUST-000002', 'USR-0000004', 'f301bfc59be9e619fc4213f8b4879eef.jpg', 50000000, 1000000, '2019-10-18 16:13:21', '', 'Y');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` varchar(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nama_lengkap` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telepon` varchar(12) NOT NULL,
  `level` enum('Admin','Manager','Finance') NOT NULL,
  `aktif` enum('Y','T') NOT NULL,
  `tgl_registrasi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `nama_lengkap`, `email`, `telepon`, `level`, `aktif`, `tgl_registrasi`) VALUES
('USR-0000001', 'siti', 'sitich', 'Siti Chadijah', 'siti@gmail.com', '08987748441', 'Manager', 'Y', '2019-10-01 16:21:06'),
('USR-0000002', 'havizim', 'havizim', 'Haviz Indra Maulana', 'haviz_im@outlook.com', '08987748441', 'Admin', 'Y', '2019-10-18 15:16:25'),
('USR-0000003', 'raffy', 'raffy', 'Raffy Ahmad', 'raffy@gmail.com', '123123123', 'Finance', 'Y', '2019-10-18 15:17:19'),
('USR-0000004', 'admin1', '1234', 'siti chadijah', 'shitichadijah@gmail.com', '083872405472', 'Admin', 'Y', '2019-10-18 16:06:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_log`
--

CREATE TABLE `user_log` (
  `id_log` int(11) NOT NULL,
  `id_user` varchar(11) NOT NULL,
  `referensi` varchar(10) NOT NULL,
  `deskripsi` text NOT NULL,
  `tgl_log` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user_log`
--

INSERT INTO `user_log` (`id_log`, `id_user`, `referensi`, `deskripsi`, `tgl_log`) VALUES
(1, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-01 16:48:30'),
(2, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-09 12:23:22'),
(3, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-09 12:39:29'),
(4, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-09 12:40:27'),
(5, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 16:55:49'),
(6, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 17:27:15'),
(7, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 17:28:31'),
(8, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 17:33:49'),
(9, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 17:35:21'),
(10, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-11 17:38:39'),
(11, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-11 19:03:27'),
(12, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-11 19:05:42'),
(13, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-11 19:17:52'),
(14, 'USR-0000001', 'USR-000000', 'Menghapus user', '2019-10-11 19:25:16'),
(15, 'USR-0000001', 'USR-000000', 'Mengedit user', '2019-10-11 19:28:53'),
(16, 'USR-0000001', 'USR-000000', 'Mengedit user', '2019-10-11 19:29:10'),
(44, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-15 03:42:33'),
(53, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-15 12:03:25'),
(54, 'USR-0000001', 'PO', 'Approve purchase order', '2019-10-15 12:25:32'),
(55, 'USR-0000001', 'PO', 'Approve purchase order', '2019-10-15 12:27:17'),
(56, 'USR-0000001', 'Auth', 'Berhasil mengganti password', '2019-10-15 12:40:33'),
(57, 'USR-0000001', 'Auth', 'Berhasil mengedit profile', '2019-10-15 12:40:44'),
(58, 'USR-0000001', 'Auth', 'Berhasil mengedit profile', '2019-10-15 12:40:53'),
(59, 'USR-0000001', 'Auth', 'Berhasil melakukan logout', '2019-10-15 12:41:26'),
(60, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-15 12:45:18'),
(61, 'USR-0000001', 'Auth', 'Berhasil melakukan logout', '2019-10-15 12:51:55'),
(91, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-15 22:30:45'),
(92, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-15 22:44:26'),
(97, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-15 22:51:34'),
(98, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-16 05:41:08'),
(99, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-16 05:52:01'),
(100, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-16 06:04:56'),
(105, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-16 06:29:38'),
(106, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-16 06:30:34'),
(109, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-16 14:28:52'),
(110, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-16 16:11:05'),
(115, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 00:17:44'),
(116, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 00:19:36'),
(117, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:14:56'),
(118, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-18 15:16:25'),
(119, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-18 15:17:19'),
(120, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:17:38'),
(121, 'USR-0000002', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:17:47'),
(122, 'USR-0000002', 'Customer', 'Menambahkan customer baru', '2019-10-18 15:18:25'),
(123, 'USR-0000002', 'PO', 'Menambahkan PO baru', '2019-10-18 15:19:29'),
(124, 'USR-0000002', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:19:49'),
(125, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:19:53'),
(126, 'USR-0000001', 'PO', 'Approve purchase order', '2019-10-18 15:20:17'),
(127, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:20:22'),
(128, 'USR-0000003', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:20:27'),
(129, 'USR-0000003', 'Payment', 'Menambahkan Payment baru', '2019-10-18 15:21:39'),
(130, 'USR-0000003', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:23:27'),
(131, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:23:39'),
(132, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:23:39'),
(133, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:32:44'),
(134, 'USR-0000003', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:32:48'),
(135, 'USR-0000003', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:36:18'),
(136, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:39:10'),
(137, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:45:33'),
(138, 'USR-0000002', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:45:38'),
(139, 'USR-0000002', 'PO', 'Menambahkan PO baru', '2019-10-18 15:46:06'),
(140, 'USR-0000002', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:46:54'),
(141, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:46:58'),
(142, 'USR-0000001', 'PO', 'Approve purchase order', '2019-10-18 15:47:04'),
(143, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 15:47:41'),
(144, 'USR-0000002', 'Login', 'Berhasil melakukan Login', '2019-10-18 15:47:49'),
(145, 'USR-0000002', 'PO', 'Menambahkan PO baru', '2019-10-18 15:49:53'),
(146, 'USR-0000002', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:00:51'),
(147, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:02:06'),
(148, 'USR-0000001', 'User', 'Menambahkan user baru', '2019-10-18 16:06:51'),
(149, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:07:09'),
(150, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:07:29'),
(151, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:07:50'),
(152, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:08:18'),
(153, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:09:49'),
(154, 'USR-0000004', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:10:00'),
(155, 'USR-0000004', 'Auth', 'Berhasil mengganti password', '2019-10-18 16:10:31'),
(156, 'USR-0000004', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:10:40'),
(157, 'USR-0000004', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:10:56'),
(158, 'USR-0000004', 'Customer', 'Menambahkan customer baru', '2019-10-18 16:12:19'),
(159, 'USR-0000004', 'PO', 'Menambahkan PO baru', '2019-10-18 16:13:21'),
(160, 'USR-0000004', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:13:37'),
(161, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:13:52'),
(162, 'USR-0000001', 'PO', 'Approve purchase order', '2019-10-18 16:14:02'),
(163, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-18 16:14:37'),
(164, 'USR-0000003', 'Login', 'Berhasil melakukan Login', '2019-10-18 16:14:56'),
(165, 'USR-0000003', 'Payment', 'Menambahkan Payment baru', '2019-10-18 16:16:08'),
(166, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:13:41'),
(167, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-26 13:13:52'),
(168, 'USR-0000002', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:13:56'),
(169, 'USR-0000002', 'Logout', 'Berhasil melakukan logout', '2019-10-26 13:18:40'),
(170, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:18:47'),
(171, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-26 13:20:27'),
(172, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:20:31'),
(173, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-26 13:25:37'),
(174, 'USR-0000002', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:26:51'),
(175, 'USR-0000002', 'Logout', 'Berhasil melakukan logout', '2019-10-26 13:33:42'),
(176, 'USR-0000001', 'Login', 'Berhasil melakukan Login', '2019-10-26 13:33:49');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id_customer`);

--
-- Indeks untuk tabel `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`no_payment`),
  ADD KEY `id_partner` (`id_customer`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `payment_detail`
--
ALTER TABLE `payment_detail`
  ADD KEY `no_paymeny` (`no_payment`),
  ADD KEY `no_po` (`no_po`);

--
-- Indeks untuk tabel `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD PRIMARY KEY (`no_po`),
  ADD KEY `id_partner` (`id_customer`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `user_log`
--
ALTER TABLE `user_log`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`);

--
-- Ketidakleluasaan untuk tabel `payment_detail`
--
ALTER TABLE `payment_detail`
  ADD CONSTRAINT `payment_detail_ibfk_1` FOREIGN KEY (`no_payment`) REFERENCES `payment` (`no_payment`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `payment_detail_ibfk_2` FOREIGN KEY (`no_po`) REFERENCES `purchase_order` (`no_po`);

--
-- Ketidakleluasaan untuk tabel `purchase_order`
--
ALTER TABLE `purchase_order`
  ADD CONSTRAINT `purchase_order_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `purchase_order_ibfk_2` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`);

--
-- Ketidakleluasaan untuk tabel `user_log`
--
ALTER TABLE `user_log`
  ADD CONSTRAINT `user_log_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
