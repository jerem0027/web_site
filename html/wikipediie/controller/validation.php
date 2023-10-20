<?php
session_start();
include_once '../Model/dbFactory.php';

$id = $_POST["id"];

# CONNECTION BD
$dbfactory = new \Rediite\Model\Factory\dbFactory();

// Passe la validation a TRUE
$stmt = $dbfactory->requete("UPDATE Page set VALIDATED=1 WHERE ID_PAGE=".$id.";");
// ajoute l'admin qui a validé la page
$stmt = $dbfactory->requete("UPDATE Page set ID_ADMIN =".$_SESSION['id_admin']." WHERE ID_PAGE = ".$id.";");

header('Location: ../vue/admin.php');
?>
