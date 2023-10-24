<?php
    $conn = new mysqli("localhost", "site_perso_user", "site_perso_passwd", "home_db");
    
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
?>