-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2024. Már 02. 14:37
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
  `Level` int(11) NOT NULL DEFAULT 0,
  `Uid` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `logindata`
--

INSERT INTO `logindata` (`Username`, `PWD`, `Level`, `Uid`) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 3, 'admin11111');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `userdata`
--

CREATE TABLE `userdata` (
  `Name` varchar(100) NOT NULL,
  `Adress` varchar(250) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Phonenumber` varchar(30) NOT NULL,
  `UserID` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `logindata`
--
ALTER TABLE `logindata`
  ADD KEY `Uid` (`Uid`);

--
-- A tábla indexei `userdata`
--
ALTER TABLE `userdata`
  ADD KEY `UserID` (`UserID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `userdata`
--
ALTER TABLE `userdata`
  ADD CONSTRAINT `userdata_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `logindata` (`Uid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
