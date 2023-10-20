<?php

// Savoir si un admin est connecté
if(!isset($_SESSION['id_admin']) or $_SESSION['id_admin'] == "" or $_SESSION['id_admin'] == -1 ){
    //affiche le menu normal
    include('../vue/menu.html');
}
else {
    // Affiche le menu admin
    include('../vue/menu_deconnection.html'); 
}
?>