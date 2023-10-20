<?php
session_start();    // debut de la session
include_once("../utils/autoloader.php");
include('head.html');
?>
<body>
<?php include_once('../controller/load_menu.php'); ?>
<div id="apropos">
    <div class="bienvenue">
        <h1>Bienvenu(e)s sur WikipedIIE</h1>
        <p>
            WikipedIIE est une encyclopédie en ligne libre. 
        </p>
            Les articles sont créés par la communautée, puis validé par notre équipe de modération. 
            L'équipe est également présente pour supprimer les articles inadéquats. <br>
            Les articles validés présentent un symbole en haut à droite.
        </p>
            Les sujets publiés sur cette encyclopédie sont très riches et variés. 
            Afin de trouver plus facilement les articles que vous souhaitez, vous utiliser le filtre pour faciliter votre recherche d'un article.
        </p>  
    </div>
    <div class="bienvenue">
        <h1> Les fonctionnalitées à venir </h1>
        <p>
            - Il sera bientôt possible d'éditer un article, ne vous en faite ça arrive !<br>
            - Pouvoir devenir modérateur de la plateforme <br>
            - Proposer des nouvelles catégories <br>
            - Ajouter des images pour illustrer les propos <br>
            - Partager en un clic les articles <br>
            - Ajouter des références vers d'autres pages 
        </p>  
    </div>
    <div class="bienvenue"> 
        <h2>Créateurs: </h2>
        <ul>
            <li>Jérémie Henrion</li>
            <li>Mikael Ferreira De Almeida</li>
            <li>Wissam Ait kheddache</li>
        </ul> 
    </div>
</div>
</body>