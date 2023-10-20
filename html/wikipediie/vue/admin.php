<?php
session_start();
// chargement header et model
include_once("../utils/autoloader.php");

// verification qu'on est bien connecté en admin
if(!isset($_SESSION['id_admin']) or $_SESSION['id_admin'] == "" or $_SESSION['id_admin']== -1){
    header("Location: ../vue/connection.php");
}
include("head.html");
?>

<body> 
    <?php include('../vue/menu_deconnection.html') ?>
    <script  src="../controller/create.js"></script>
    <div class="article">
<?php

// Connection a la base de donnée et recuperation des articles non validé
$dbfactory = new \Rediite\Model\Factory\dbFactory();
$stmt = $dbfactory->requete("SELECT * FROM Page WHERE VALIDATED = FALSE;");

// affichage des articles
foreach ($stmt->fetchAll() as $page) { ?>

    <div class="container">
        <h1>Titre: <span class="black"> <?php echo $page["TITLE"]; ?></span></h1>
        <h4>Author: <span class="black"> <?php echo $page["AUTHOR"]; ?></span> &nbsp;&nbsp;&nbsp; Date: <span class="black"><?php echo $page["DATE"]; ?> </span></h4>
        <h2>Lien: <a href="./loadpage.php?url=<?php echo $page["URL"]; ?>"><?php echo substr(substr($page["URL"], 13), 0, -4); ?></a></h2><br>
        <h2>Synopsis:</h2>
        <p><?php echo $page["SYNOPSIS"]; ?></p>
        <input type="hidden" name="id" value=<?php echo $page["ID_PAGE"] ?>>
        <div style="display: flex; margin:5px;">
            <form action="../controller/validation.php" method="post">
                <input type="hidden" name="id" value=<?php echo $page["ID_PAGE"] ?>>
                <input type='submit' class="button2" value="Valider">
            </form>
            <form action="../controller/remove.php" method="post">
                <input type="hidden" name="id" value=<?php echo $page["ID_PAGE"] ?>>
                <input type="hidden" name="url" value=<?php echo $page["URL"] ?>>
                <!-- Affiche un message de validation en cas de suppression -->
                <input type="submit" class="btnsuppr" onclick="if(!confirm('Voulez-vous vraiment supprimer cet article ?')) return false;" value="Supprimer">
            </form>
        </div>
    </div>
<?php } ?>
</div>
</body>
