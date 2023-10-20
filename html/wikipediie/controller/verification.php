<?php
session_start();
include_once("../utils/autoloader.php");
$user = $_POST["username"];
$mdp = $_POST["password"];

$dbfactory = new \Rediite\Model\Factory\dbFactory();
$stmt = $dbfactory->requete("SELECT * FROM Admin WHERE username='".$user."' AND password='".$mdp."';");

// echo "user :".$user. " mdp : " .$mdp;
$i = 0;
$id = -1;
foreach ($stmt->fetchAll() as $cat) {
    $i = $i + 1;
    $id = $cat["ID_ADMIN"];
}
if($i!=0)
{
    $_SESSION['id_admin'] = $id;
    header("Location: ../vue/admin.php");
}
else
{
    header("Location: ../vue/connection.php?erreur=1");
}
?>