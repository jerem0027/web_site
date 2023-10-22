<?php
//error_reporting(E_ALL);
//ini_set("display_errors", 1);

    $conn = new mysqli("localhost", "site_perso_user", "site_perso_passwd", "home_db");

    if(isset($_POST['pseudo_form']) and isset($_POST['nom']) and isset($_POST['prenom']) and isset($_POST['email']) and isset($_POST['password_form']) and isset($_POST['born_date'])){
        $nom = $_POST['nom'];
        $prenom = $_POST['prenom'];
        $pseudo = $_POST['pseudo_form'];
        $email = $_POST['email'];
        $passwd = $_POST['password_form'];
        $born_date = date('Y-m-d', strtotime($_POST['born_date']));
        $passwd = password_hash($passwd,PASSWORD_BCRYPT);
        $stmt = $conn->prepare("INSERT INTO Users VALUES (?,?,?,?,?,?);");
        $stmt->bind_param("ssssss", $nom, $prenom, $pseudo, $passwd, $email, $born_date);
        $stmt->execute();
        $stmt->store_result();
        if($stmt){
            echo json_encode(array('status' => 'success', 'msg' => 'New user added'));
        }
        else{
            echo json_encode(array('status' => 'error', 'msg' => 'Insertion in DB failed'));
        }
    }
    else {
        echo json_encode(array('status' => 'error', 'msg' => 'A fields is not set'));
    }

    header('Location: /home/');
?>