<?php
    $conn = new mysqli("localhost", "site_perso_user", "site_perso_passwd", "home_db");

    switch ($_POST['check']) {
        case "pseudo":
            if(isset($_POST['pseudo'])){
                $pseudo = $_POST['pseudo'];
                $stmt = $conn->prepare("SELECT * FROM Users WHERE Pseudo=?");
                $stmt->bind_param("s", $pseudo);
                $stmt->execute();
                $stmt->store_result();
                if($stmt->num_rows == 0){
                    
                    echo json_encode(array('status' => 'success', 'msg' => 'pseudo '.$pseudo.' is not use'));
                }
                else{
                    echo json_encode(array('status' => 'error', 'msg' => 'Pseudo '.$pseudo.' already used'));
                }
            }
            else {
                echo json_encode(array('status' => 'error', 'msg' => 'pseudo is not set'));
            }
            break;
        case "connection":
            if(isset($_POST['pseudo']) && isset($_POST['password']) ){
                $pseudo = $_POST['pseudo'];
                $password = $_POST['password'];
                $stmt = $conn->prepare("SELECT Prenom, Nom, Passwd FROM Users WHERE Pseudo=?");
                $stmt->bind_param("s", $pseudo);
                $stmt->execute();
                $stmt->store_result();
                $stmt->bind_result($prenom, $nom, $passwd);
                if($stmt->num_rows == 1){
                    $stmt->fetch();
                    if(password_verify($password, $passwd))
                        echo json_encode(array('status' => 'success','nom' => $nom, 'prenom' => $prenom, 'msg' => 'Access allow'));
                    else
                        echo json_encode(array('status' => 'error', 'msg' => 'Access denied'));
                }
                else{
                    echo json_encode(array('status' => 'error', 'msg' => 'Access denied'));
                }
            }
            else {
                echo json_encode(array('status' => 'error', 'msg' => 'pseudo or password is not set'));
            }
            break;

    }








?>