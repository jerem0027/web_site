<?php
session_start();    // debut de la session
include_once("../utils/autoloader.php");
include('head.html');
?>

<body> 
    <?php include('../controller/load_menu.php') ?>
    <script  src="../controller/create.js"></script>
    <form action="../controller/generate_page.php" id="newpage" method="post">
        <div class="container" id='firstform'>
            <?php
            if(isset($_GET['erreur'])){
                $err = $_GET['erreur'];
            if($err==3)
                echo "<p style='color:red'>La page que vous tentez de crée existe deja !</p>";
            }
            ?>
            <!-- Titre  -->
            <div class="input">
                <label for=title> Titre </label>
                <input type="text" maxlength="50" name="title" id="title" required>    
            </div>
            <br>
            <!-- Auteur -->
            <div class="input">
                <label for=author> Auteur </label>
                <input type="text" maxlength="20" name="author" id="author" required>    
            </div>
            <br>
            <!-- Synopsis  -->
            <div class="input">
                <label for=synopsis> Synopsis </label>
                <textarea maxlength="480" rows="3" name="synopsis" id="synopsis" required></textarea> 
            </div> 
            <br>
            <!-- Categoties possible -->
            <div class="input">
                <?php
                $dbfactory = new \Rediite\Model\Factory\dbFactory();
                $sql = "SELECT * FROM Categorie ORDER BY NAME;";
                $stmt = $dbfactory->requete($sql);
                $stmt = $stmt->fetchAll()
                ?>
                <label for=cat1> Catégories : </label>
                <!-- categorie 1 -->
                <select name=cat1 id=cat1>
                    <?php
                    foreach ($stmt as $cat){
                        if(!empty($cat['NAME']))
                            echo "<option value=".$cat['ID_CAT'].">".$cat['NAME']."</option>";
                    }
                    ?>
                </select>
                <!-- categorie 2 -->
                <select name=cat2>
                    <?php
                    foreach ($stmt as $cat){
                        if(!empty($cat['NAME']))
                            echo "<option value=".$cat['ID_CAT'].">".$cat['NAME']."</option>";
                    }
                    ?>
                </select>
            </div>
        </div>
        <br>
        <div class="container section">
            <!-- Section 1  -->
            <div>
                <div class="input">
                    <label for=section0> Section  </label> <br>
                    <input type="text" maxlength="128" name="section0" id="section0" required>        
                </div>
                <br>
                <div class="input">
                    <label for="content0"> Contenu </label><br>
                    <textarea name="content0" id="content0" rows="10" required></textarea>       
                </div>
            </div>
        </div>  
        <div style="background-color: white;" id="btn_create">
            <!-- renvoi vers une fonction JavaScript permettant d'ajouter une section au dessus du bouton -->
            <input class="button2" style="border-radius: 30px;" type='button' onclick="addSection()" value="Ajouter une section">
            <input class="button2" style="border-radius: 30px;" type="submit" value="Publier l'article">
        </div>
    </form>

</body>
