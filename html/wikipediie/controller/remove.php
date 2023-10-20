<?php

include_once '../Model/dbFactory.php';

$id = $_POST["id"];

# CONNECTION BD
$dbfactory = new \Rediite\Model\Factory\dbFactory();
// Supprime la page de la base de donnée
$stmt = $dbfactory->requete("DELETE FROM Page WHERE ID_PAGE=".$id.";");
// Supprime le fichier
unlink($_POST['url']);
header('Location: ../vue/admin.php');
?>
