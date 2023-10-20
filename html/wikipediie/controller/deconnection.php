<?php
session_start();
session_destroy();  // Detruit la session 

header('Location: ../vue/connection.php'); // renvoi vers la page de deconnection
?>