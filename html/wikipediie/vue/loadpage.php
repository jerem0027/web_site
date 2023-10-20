<?php
session_start();    // debut de la session
include_once("../utils/autoloader.php");
include_once('head.html');
?>
<body>
    <?php 
    include_once('../controller/load_menu.php');
    $url = $_GET['url'];
    $dbfactory = new \Rediite\Model\Factory\dbFactory();
    ?>
        <div class="page">
            <?php 
            include_once('sidebar.php'); 
            ?>

            <div class="page">
            <p> <b> Catégorie : </b>
            
            <?php // Recupere les categories d'un article
            
            $msg = "";
            $sql = "SELECT * FROM Categorie C, Page P WHERE P.URL='".$url."' AND C.ID_CAT = P.ID_CAT1;";
            $stmt = $dbfactory->requete($sql);
            // Categorie 1 si elle existe
            foreach ($stmt->fetchAll() as $cat){
                $msg = $cat["NAME"];
            }
            // Si la cat1 existe il y en a peut etre 2
            if(!empty($msg)){
                $msg2 = "";
                $sql = "SELECT * FROM Categorie C, Page P WHERE P.URL = '".$url."' AND C.ID_CAT = P.ID_CAT2;";
                $stmt = $dbfactory->requete($sql);
                // Categorie 2 si elle existe
                foreach ($stmt->fetchAll() as $cat){
                    $msg2 = $cat["NAME"];
                }
                if(!empty($msg2)){
                    $msg = $msg." et ".$msg2;
                }
            }
            else{
                $msg = "Aucune";
            }
            // Affiche la categorie
            echo $msg;

            // Est ce que mon article est validé ?
            $sql = "SELECT VALIDATED FROM Page WHERE URL='".$url."';";
            $stmt = $dbfactory->requete($sql);
            $msg = 'test';
            foreach ($stmt->fetchAll() as $page){
                $msg = $page["VALIDATED"];
            }
            // Il est validé alors je l'affiche
            if($msg){
                echo "<img id='logo_validation' alt='Logo validation' src='images/logo_validation.png'>";
            }
            ?>
            </p>
            </div>
            <?php
            include_once($url);
            ?>
        </div>
</body>
