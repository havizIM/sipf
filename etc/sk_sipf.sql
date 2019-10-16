-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 16 Okt 2019 pada 19.23
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.1.32

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
  `tgl_input_customer` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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

-- --------------------------------------------------------

--
-- Struktur dari tabel `payment_detail`
--

CREATE TABLE `payment_detail` (
  `no_payment` varchar(11) NOT NULL,
  `no_po` varchar(11) NOT NULL,
  `jml_dibayar` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('USR-0000001', 'siti', 'sitich', 'Siti Chadijah', 'siti@gmail.com', '08987748441', 'Manager', 'Y', '2019-10-01 16:21:06');

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
(110, 'USR-0000001', 'Logout', 'Berhasil melakukan logout', '2019-10-16 16:11:05');

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
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

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
