<?php
    // const PASSWORD_BCRYPT = "test_truc";
    switch ($_POST['encrypt']) {
        case "pass":
            if(isset($_POST['pass'])){
                $password = $_POST['pass'];
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
                echo json_encode(array('status' => 'success', 'msg' => $hashedPassword));
            }
            else {
                echo json_encode(array('status' => 'error', 'msg' => 'error'));
            }
            break;
        case "verify":
            $hashedPasswordFromDatabase = 'motDePasseHaché';

            // Mot de passe fourni par l'utilisateur lors de la tentative de connexion
            $userProvidedPassword = 'motDePasseDeLUtilisateur';
            
            // Vérifiez le mot de passe en utilisant password_verify
            if (password_verify($userProvidedPassword, $hashedPasswordFromDatabase)) {
                // Mot de passe valide, l'utilisateur est authentifié
                echo 'Mot de passe valide. L\'utilisateur est authentifié.';
            } else {
                // Mot de passe invalide, l'utilisateur n'est pas authentifié
                echo 'Mot de passe invalide. L\'utilisateur n\'est pas authentifié.';
            }
            break;
    }

?>