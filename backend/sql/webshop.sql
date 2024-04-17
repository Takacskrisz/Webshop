-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2024. Ápr 13. 16:23
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshop`
--
DROP DATABASE IF EXISTS `webshop`;
CREATE DATABASE IF NOT EXISTS `webshop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_hungarian_ci;
USE `webshop`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `logindata`
--

CREATE TABLE `logindata` (
  `Username` varchar(50) NOT NULL,
  `PWD` varchar(100) NOT NULL,
  `Uid` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `logindata`
--

INSERT INTO `logindata` (`Username`, `PWD`, `Uid`, `email`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 'admin11111', 'admin@admin.com'),
('elado100', '449b4ad8c03596495fd0d81a4110b4aa', 'elado100b111deb1-41d0-4953-ad7c-3d280f7c9527', 'el@ado.hu'),
('kisbela12', 'fc32ce27d478041efedc9e988a2c0b0e', 'kisbela123890aca0-46f4-4573-9822-8512ef841b27', 'kis@bela.com'),
('Mintaember', '7815696ecbf1c96e6894b779456d330e', 'Mintaember5b68727c-dfeb-423f-be35-2a799ba9b3de', 'minta@ember.com'),
('nagyanna88', 'ce03e9fbc1ed5e587809cde6423764ec', 'nagyanna88ce52b4a0-db07-4889-8906-0fc47b720d98', 'nagy@anna.hu');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `logindata`
--
ALTER TABLE `logindata` ADD PRIMARY KEY(`email`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
