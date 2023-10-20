-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Lun 21 Février 2022 à 22:45
-- Version du serveur :  10.3.31-MariaDB-0+deb10u1
-- Version de PHP :  7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `home_db`
--
CREATE DATABASE IF NOT EXISTS `home_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `home_db`;

-- --------------------------------------------------------

--
-- Structure de la table `Invite`
--

CREATE TABLE `Invite` (
  `id` int(11) NOT NULL,
  `token` varchar(37) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `destinataire` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `Invite`
--

INSERT INTO `Invite` (`id`, `token`, `prenom`, `nom`, `email`, `destinataire`) VALUES
(1, 'dc4449b2-0cf8-42dd-95c3-8083194ec4a2', 'Jean', 'John', 'jean_john@test.com', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Pseudo` varchar(50) NOT NULL,
  `Passwd` varchar(60) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `Born_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `Users`
--

INSERT INTO `Users` (`Nom`, `Prenom`, `Pseudo`, `Passwd`, `Mail`, `Born_date`) VALUES
('Henrion', 'Jérémie', 'admin', '$2y$10$/mBSFySgCW8Tzbe5pEriZeK0Tz7XPJj0cYOmaDY0mY8Sx30c5I14O', 'jeremie.henrion@gmail.com', '2000-08-16'),
('Sirius', 'White', 'Dumbldaube', '$2y$10$EiQty.WpE3i5lwy3aaWRv.t4.DiRUVO8w76dg3KdtXtqnvC2CQozG', 'swd@free.com', '2021-05-03');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Invite`
--
ALTER TABLE `Invite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Pseudo`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Invite`
--
ALTER TABLE `Invite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;--
-- Base de données :  `wikipediie`
--
CREATE DATABASE IF NOT EXISTS `wikipediie` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `wikipediie`;

-- --------------------------------------------------------

--
-- Structure de la table `Admin`
--

CREATE TABLE `Admin` (
  `ID_ADMIN` int(11) NOT NULL,
  `USERNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `Admin`
--

INSERT INTO `Admin` (`ID_ADMIN`, `USERNAME`, `PASSWORD`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `Categorie`
--

CREATE TABLE `Categorie` (
  `ID_CAT` int(11) NOT NULL,
  `NAME` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `Categorie`
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

CREATE TABLE `Page` (
  `ID_PAGE` int(11) NOT NULL,
  `TITLE` varchar(50) NOT NULL,
  `URL` varchar(50) NOT NULL,
  `AUTHOR` varchar(20) NOT NULL,
  `DATE` date NOT NULL,
  `VALIDATED` tinyint(1) NOT NULL,
  `SYNOPSIS` varchar(500) NOT NULL,
  `ID_ADMIN` int(11) DEFAULT NULL,
  `ID_CAT1` int(11) DEFAULT NULL,
  `ID_CAT2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Contenu de la table `Page`
--

INSERT INTO `Page` (`ID_PAGE`, `TITLE`, `URL`, `AUTHOR`, `DATE`, `VALIDATED`, `SYNOPSIS`, `ID_ADMIN`, `ID_CAT1`, `ID_CAT2`) VALUES
(2, 'TEST', '../vue/pages/test.php', 'Jeremie Henrion', '2021-01-29', 0, 'Ceci est la page de test !', NULL, 3, 4),
(5, 'Soleil', '../vue/pages/soleil.php', 'Mikael Ferreira', '2021-01-29', 1, 'Le Soleil est l étoile du Système solaire. Dans la classification astronomique, c est une étoile de type naine jaune d une masse d environ 1,989 1 × 1030 kg, composée d hydrogène (75 % de la masse ou 92 % du volume) et d hélium (25 % de la masse ou 8 % du volume)', NULL, 4, 1),
(6, 'Papa Jhonny', '../vue/pages/papa_jhonny.php', 'Ton plus grand fan', '2021-01-29', 1, 'Johnny Hallyday, nom de scène de Jean-Philippe Smet, né le 15 juin 1943 dans le 9e arrondissement de Paris et mort le 5 décembre 2017 à Marnes-la-Coquette (Hauts-de-Seine), est un chanteur, compositeur et acteur français.', 1, 10, 1),
(7, 'Hadès', '../vue/pages/hadès.php', 'Zagreus', '2021-01-29', 1, 'Hades est un jeu vidéo roguelike action-RPG développé et publié par Supergiant Games, sorti le 17 septembre 2020 sur Microsoft Windows et Nintendo Switch.', 1, 11, 12);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`ID_ADMIN`);

--
-- Index pour la table `Categorie`
--
ALTER TABLE `Categorie`
  ADD PRIMARY KEY (`ID_CAT`);

--
-- Index pour la table `Page`
--
ALTER TABLE `Page`
  ADD PRIMARY KEY (`ID_PAGE`),
  ADD KEY `Page_Admin_FK` (`ID_ADMIN`),
  ADD KEY `Page_Categorie0_FK` (`ID_CAT1`),
  ADD KEY `Page_Categorie1_FK` (`ID_CAT2`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `Admin`
--
ALTER TABLE `Admin`
  MODIFY `ID_ADMIN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `Categorie`
--
ALTER TABLE `Categorie`
  MODIFY `ID_CAT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `Page`
--
ALTER TABLE `Page`
  MODIFY `ID_PAGE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `Page`
--
ALTER TABLE `Page`
  ADD CONSTRAINT `Page_Admin_FK` FOREIGN KEY (`ID_ADMIN`) REFERENCES `Admin` (`ID_ADMIN`),
  ADD CONSTRAINT `Page_Categorie0_FK` FOREIGN KEY (`ID_CAT1`) REFERENCES `Categorie` (`ID_CAT`),
  ADD CONSTRAINT `Page_Categorie1_FK` FOREIGN KEY (`ID_CAT2`) REFERENCES `Categorie` (`ID_CAT`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
