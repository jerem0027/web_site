<?php
session_start();    // debut de la session
include_once("../utils/autoloader.php");
include('head.html');

// afficher les articles dejà ecrits (leur url, titre et synopsis)
function displayArticle($sql){
    $dbfactory = new \Rediite\Model\Factory\dbFactory();
    $stmt = $dbfactory->requete($sql);
    foreach ($stmt->fetchAll() as $page) { ?>
    <div class='container'>
        <h3> Titre : <span class="black"><a href='./loadpage.php?url=<?php echo $page['URL']; ?>'><?php echo $page["TITLE"]; ?></a></span></h3>
        <h3> Synopsis : </h3>
        <p>
        <?php echo $page["SYNOPSIS"];?>
        </p>
        <?php
            if(strcmp($page["NAME1"], "") == 0){
                ?>
                <h3> Catégorie : <span class="black"> Aucune </span></h3>
                <?php
            }
            elseif(strcmp($page["NAME"], "") == 0){
                ?>
                <h3> Catégorie : <span class="black"> <?php echo $page["NAME1"]?></span></h3>
                <?php
            }
            else{
                ?>
                <h3> Catégories : <span class="black"> <?php echo $page["NAME1"]." et ".$page["NAME"]; ?></span></h3>
                <?php
            }
        ?>
        
    </div>
<?php }
}
?>

<body>
    <?php include_once('../controller/load_menu.php'); ?>
<!-- Récupérer le titre url synopsis en fonction de la categorie choisie -->
    <div class="article">
    <?php include('sidebar.php') ?>
        <?php
        $sql = "SELECT p.TITLE, p.SYNOPSIS, p.URL, Ca.NAME as NAME1, Cat.NAME FROM Categorie Ca, Categorie Cat, Page p WHERE Ca.ID_CAT=p.ID_CAT1 AND Cat.ID_CAT=p.ID_CAT2";
               
        $sql2 = "";
        if(isset($_GET['filter'])){
            $filter = $_GET['filter'];
            if(strcmp($filter, "Aucune") != 0){

                $sql = "SELECT p.TITLE, p.SYNOPSIS, p.URL, Ca.NAME as NAME1, Cat.NAME FROM Categorie Ca, Categorie Cat, Page p WHERE Ca.ID_CAT=p.ID_CAT1 AND Cat.ID_CAT=p.ID_CAT2 AND Ca.NAME='".$filter."';";
                $sql2 = "SELECT p.TITLE, p.SYNOPSIS, p.URL, Ca.NAME as NAME1, Cat.NAME FROM Categorie Ca, Categorie Cat, Page p WHERE Ca.ID_CAT=p.ID_CAT1 AND Cat.ID_CAT=p.ID_CAT2 AND Cat.NAME ='".$filter."';";

            }
        }
        #Appel à la méthode qui affiche les articles
        displayArticle($sql);
        if(!empty($sql2)){
            displayArticle($sql2);
        }
        ?>   
    </div>

</body>
<!-- </html> -->
