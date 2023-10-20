-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mariadb:3306
-- Généré le : mar. 14 mars 2023 à 22:49
-- Version du serveur : 10.3.36-MariaDB-0+deb10u2
-- Version de PHP : 8.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de données : `home_db`
--
DROP DATABASE IF EXISTS `home_db`;
CREATE DATABASE IF NOT EXISTS `home_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `home_db`;

-- --------------------------------------------------------

--
-- Structure de la table `Invite`
--

CREATE TABLE IF NOT EXISTS `Invite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(37) COLLATE utf8_unicode_ci DEFAULT NULL,
  `prenom` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nom` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `destinataire` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Invite`
--

INSERT INTO `Invite` (`id`, `token`, `prenom`, `nom`, `email`, `destinataire`) VALUES
(1, 'dc4449b2-0cf8-42dd-95c3-8083194ec4a2', 'Jean', 'John', 'jean_john@test.com', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `test` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`test`) VALUES
(5),
(10),
(80),
(90);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `Nom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Prenom` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Pseudo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Passwd` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `Mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Born_date` date NOT NULL,
  PRIMARY KEY (`Pseudo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`Nom`, `Prenom`, `Pseudo`, `Passwd`, `Mail`, `Born_date`) VALUES
('Henrion', 'Jérémie', 'admin', '$2y$10$/mBSFySgCW8Tzbe5pEriZeK0Tz7XPJj0cYOmaDY0mY8Sx30c5I14O', 'jeremie.henrion@gmail.com', '2000-08-16'),
('Sirius', 'White', 'Dumbldaube', '$2y$10$EiQty.WpE3i5lwy3aaWRv.t4.DiRUVO8w76dg3KdtXtqnvC2CQozG', 'swd@free.com', '2021-05-03');
--
-- Base de données : `wikipediie`
--
DROP DATABASE IF EXISTS `wikipediie`;
CREATE DATABASE IF NOT EXISTS `wikipediie` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `wikipediie`;

-- --------------------------------------------------------

--
-- Structure de la table `Admin`
--

CREATE TABLE IF NOT EXISTS `Admin` (
  `ID_ADMIN` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `PASSWORD` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_ADMIN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Admin`
--

INSERT INTO `Admin` (`ID_ADMIN`, `USERNAME`, `PASSWORD`) VALUES
(1, 'admin', 'nimda');

-- --------------------------------------------------------

--
-- Structure de la table `Categorie`
--

CREATE TABLE IF NOT EXISTS `Categorie` (
  `ID_CAT` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_CAT`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Categorie`
--

INSERT INTO `Categorie` (`ID_CAT`, `NAME`) VALUES
(1, ''),
(2, 'Aucune'),
(3, 'Sport'),
(4, 'Physique'),
(5, 'Chimie'),
(6, 'Financier'),
(7, 'Juridique'),
(8, 'Musique'),
(9, 'Cinéma'),
(10, 'Rock'),
(11, 'Jeux'),
(12, 'Mythologie');

-- --------------------------------------------------------

--
-- Structure de la table `Page`
--

CREATE TABLE IF NOT EXISTS `Page` (
  `ID_PAGE` int(11) NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `URL` varchar(65) COLLATE utf8_unicode_ci NOT NULL,
  `AUTHOR` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `DATE` date NOT NULL,
  `VALIDATED` tinyint(1) NOT NULL,
  `SYNOPSIS` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `ID_ADMIN` int(11) DEFAULT NULL,
  `ID_CAT1` int(11) DEFAULT NULL,
  `ID_CAT2` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_PAGE`),
  KEY `FK_Page_Admin` (`ID_ADMIN`),
  KEY `FK_Page_Categorie0` (`ID_CAT1`),
  KEY `FK_Page_Categorie1` (`ID_CAT2`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Page`
--

INSERT INTO `Page` (`ID_PAGE`, `TITLE`, `URL`, `AUTHOR`, `DATE`, `VALIDATED`, `SYNOPSIS`, `ID_ADMIN`, `ID_CAT1`, `ID_CAT2`) VALUES
(1, 'TEST', '../vue/pages/test.php', 'Jeremie Henrion', '2021-01-29', 1, 'Ceci est la page de test !', NULL, 3, 4),
(2, 'Soleil', '../vue/pages/soleil.php', 'Mikael Ferreira', '2021-01-29', 0, 'Le Soleil est l étoile du Système solaire. Dans la classification astronomique, c est une étoile de type naine jaune d une masse d environ 1,989 1 x 1030 kg, composée d hydrogène (75 % de la masse ou 92 % du volume) et d hélium (25 % de la masse ou 8 % du volume)', NULL, 4, 1),
(3, 'Papa Jhonny', '../vue/pages/papa_jhonny.php', 'Ton plus grand fan', '2021-01-29', 0, 'Johnny Hallyday, nom de scène de Jean-Philippe Smet, né le 15 juin 1943 dans le 9e arrondissement de Paris et mort le 5 décembre 2017 à Marnes-la-Coquette (Hauts-de-Seine), est un chanteur, compositeur et acteur français.', NULL, 10, 1),
(4, 'Hadès', '../vue/pages/hadès.php', 'Zagreus', '2021-01-29', 0, 'Hades est un jeu vidéo roguelike action-RPG développé et publié par Supergiant Games, sorti le 17 septembre 2020 sur Microsoft Windows et Nintendo Switch.', NULL, 11, 12);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Page`
--
ALTER TABLE `Page`
  ADD CONSTRAINT `FK_Page_Admin` FOREIGN KEY (`ID_ADMIN`) REFERENCES `Admin` (`ID_ADMIN`),
  ADD CONSTRAINT `FK_Page_Categorie0` FOREIGN KEY (`ID_CAT1`) REFERENCES `Categorie` (`ID_CAT`),
  ADD CONSTRAINT `FK_Page_Categorie1` FOREIGN KEY (`ID_CAT2`) REFERENCES `Categorie` (`ID_CAT`);
COMMIT;
