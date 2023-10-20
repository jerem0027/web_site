CREATE DATABASE IF NOT EXISTS `wikipediie` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `wikipediie`;

create table if not exists Admin(
    ID_ADMIN   int auto_increment,
    USERNAME   varchar(20) not null,
    PASSWORD   varchar(20) not null,
    primary key(ID_ADMIN)
);

create table if not exists Categorie(
    ID_CAT  int auto_increment,
    NAME    varchar(20) not null,
    primary key(ID_CAT)
);

create table if not exists Page(
    ID_PAGE   int auto_increment,
	TITLE     varchar(50) not null ,
	URL       varchar(65) not null ,
	AUTHOR    varchar(30) not null ,
	DATE      date not null ,
	VALIDATED boolean not null ,
	SYNOPSIS  varchar(500) not null ,
	ID_ADMIN  int,
	ID_CAT1   int,
	ID_CAT2   int,
    primary key(ID_PAGE),
    constraint FK_Page_Admin foreign key (ID_ADMIN) references Admin(ID_ADMIN),
    constraint FK_Page_Categorie0 foreign key (ID_CAT1) references Categorie(ID_CAT),
    constraint FK_Page_Categorie1 foreign key (ID_CAT2) references Categorie(ID_CAT)
);

insert into 
    Categorie(NAME)
values
    (''),
    ('Aucune'),
    ('Sport'),
    ('Physique'),
    ('Chimie'),
    ('Financier'),
    ('Juridique'),
    ('Musique'),
    ('Cinéma'),
    ('Rock'),
    ('Jeux'),
    ('Mythologie');

insert into 
    Admin(USERNAME, PASSWORD)
values
    ('admin','nimda');

insert into 
    Page(title, url, author, date, validated, synopsis, id_admin, id_cat1, id_cat2)
values
    ('TEST', '../vue/pages/test.php', 'Jeremie Henrion', '2021-01-29', 'FALSE', 'Ceci est la page de test !', NULL,  3, 4),
    ('Soleil', '../vue/pages/soleil.php', 'Mikael Ferreira', '2021-01-29', 'TRUE', 'Le Soleil est l étoile du Système solaire. Dans la classification astronomique, c est une étoile de type naine jaune d une masse d environ 1,989 1 x 1030 kg, composée d hydrogène (75 % de la masse ou 92 % du volume) et d hélium (25 % de la masse ou 8 % du volume)', NULL, 4, 1),
    ('Papa Jhonny', '../vue/pages/papa_jhonny.php', 'Ton plus grand fan', '2021-01-29', 'FALSE', 'Johnny Hallyday, nom de scène de Jean-Philippe Smet, né le 15 juin 1943 dans le 9e arrondissement de Paris et mort le 5 décembre 2017 à Marnes-la-Coquette (Hauts-de-Seine), est un chanteur, compositeur et acteur français.', NULL, 10, 1),
    ('Hadès', '../vue/pages/hadès.php', 'Zagreus', '2021-01-29', 'FALSE', 'Hades est un jeu vidéo roguelike action-RPG développé et publié par Supergiant Games, sorti le 17 septembre 2020 sur Microsoft Windows et Nintendo Switch.', NULL, 11, 12);
