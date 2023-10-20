<?php
include_once("../utils/autoloader.php");

$dbfactory = new \Rediite\Model\Factory\dbFactory();
$title = htmlspecialchars($_POST["title"]);

$filename = str_replace(" ", "_",strtolower("../vue/pages/".$title.".php"));
$sql = "SELECT * FROM Page WHERE url='".$filename."';";
$stmt = $dbfactory->requete($sql);

// verifie si notre fichier existe deja 
foreach ($stmt->fetchAll() as $cat){
    header('Location: ../vue/create.php?erreur=3');
    exit(0);
}

// On créer un fichier où écrire notre page
$fp = fopen($filename, "w") or die("Unable to open file!");
chmod($filename, 0766);
fwrite($fp, "<div class='page affichePage'><div id='titre'>");

// Ecrit le titre
$title_write = "<h1>".$title."</h1>\n";
fwrite($fp, $title_write);

// ecrit le synopsis
$synopsis = "<p>".$_POST['synopsis']."</p>\n</div>";
fwrite($fp, $synopsis);

$curr_pos = 0;
// on ecrit chaque section
foreach($_POST as $key => $value) {
    // permet d'ecrire une section quand il y en a une
    if(strcmp("section", substr($key, 0,7)) == 0){
        $section = "<div class='section'>\n<h2>".$_POST['section'.$curr_pos]."</h2>\n";
        $content = "<p>".$_POST['content'.$curr_pos]."</p>\n</div>\n";
        
        fwrite($fp, $section);
        fwrite($fp, $content);

        $curr_pos += 1;
    }
}
// ecrit l'auteur
$author = "<p>Ecrit par <i>".$_POST['author']."</i></p>";
fwrite($fp, $author);
fwrite($fp, "</div>");
fclose($fp);

// Variable à mettre dans la BD
$today = date("Y-m-d");
$cat1 = ($_POST['cat1'] == 2) ? 1 : $_POST['cat1'];
$cat2 = ($_POST['cat2'] == 2) ? 1 : $_POST['cat2'];
$syno = htmlspecialchars($_POST['synopsis']);
$author = htmlspecialchars($_POST['author']);

$sql = "INSERT INTO Page (TITLE, URL, AUTHOR, DATE, VALIDATED, SYNOPSIS, ID_ADMIN, ID_CAT1, ID_CAT2) VALUES('".$title."', '".$filename."', '".$author."', '".$today."', 0, '".$syno."', NULL,  ".$cat1 .", ".$cat2.");";
$dbfactory->requete($sql);

header("Location: ../vue/loadpage.php?url=$filename");
?>
