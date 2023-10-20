<?php
session_start();    // debut de la session
include_once("../utils/autoloader.php");
include('head.html');
?>

<body>
    <?php include('../controller/load_menu.php') ?>
    <div id="container" class="form_admin">
        <!-- zone de connexion -->
        <form action="../controller/verification.php" method="POST">
            <h1 style="color: white; text-align: center;">Connexion</h1>
            
            <label><b>Nom d'utilisateur</b></label>
            <input type="text" placeholder="Entrer le nom d'utilisateur" name="username" required>

            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer le mot de passe" name="password" required>

            <input type="submit" id='input_form' value='LOGIN' >

<?php
        // en cas d'erreur, afficher un message pour l'utilisateur
        if(isset($_GET['erreur'])){
            $err = $_GET['erreur'];
            if($err==1)
                echo "<p style='color:red'>Utilisateur ou mot de passe incorrect</p>";
        }
?>
            </form>
        </div>
</body>
