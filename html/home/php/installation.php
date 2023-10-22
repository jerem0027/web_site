<!doctype html>

<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="Page de presentation des projet réaliser par Jérémie Henrion.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

    <link rel="icon" href="logo/icon.png">
    <title>Jeremie H</title>

    <!-- Page styles -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js"></script>
    <script type="text/javascript" src="js/inscription.js"></script>
  </head>
  <body>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">

      <div class="mdl-layout__header mdl-layout__header--waterfall">
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">
          <a href="/home/index.html"><img class="logo-image" id="logo_large" alt="logo large + white version" src="logo/logo_large_white.png"></a>          </span>
          <div class="mdl-layout-spacer"></div>
          <form onsubmit = "event.preventDefault(); check_connection();"  method="POST" id="form">
                    <nav class="mdl-navigation">
                        <h2 id="affiche_name" class="connection_ok"></h2>
                        <input placeholder="Pseudo" class="mdl-textfield__input connection_input" type="text" id="pseudo">
                        <input placeholder="Password" class="mdl-textfield__input connection_input" type="password" id="password">
                    </nav>
                </form>
                <button style="background-color: #424242;" type="submit" form="form" class="mdl-button mdl-js- mdl-button--raised mdl-js-ripple-effect mdl-button--accent connection_button">Connexion</button>

                <button class="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect" id="more-button">
                    <i class="material-icons">more_vert</i>
                </button>
                <ul class="mdl-menu mdl-js-menu mdl-menu--bottom-right mdl-js-ripple-effect" for="more-button">
                    <li class="mdl-menu__item connection_ok"><a onclick="deconnection()" href="#">Deconnection</a></li>
                    <li class="mdl-menu__item connection_off"><a href="inscription.html">Inscription</a></li>
                    <li class="mdl-menu__item"><a href="#">A propos</a></li>
                </ul>
            </div>
        </div>

      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">
            <a href="/home/index.html"><img class="icon-image" src="logo/icon.png"></a>
        </span>
        <nav class="mdl-navigation">
          <span class="mdl-navigation__link" href="">Liens</span>
          <a class="mdl-navigation__link" href="/phpmyadmin">phpmyadmin</a>
          <a class="mdl-navigation__link" href="../marvel-fan/index.html">Fan site Marvel</a>
          <a class="mdl-navigation__link" href="../wikipediie/vue/home.php">Wikipediie</a>
        
          <div class="separator"></div>
          <span class="mdl-navigation__link" href="">Raspberry Pi</span>
          <a class="mdl-navigation__link" href="php/installation.php">Installation</a>
          <div class="separator"></div>
          <span class="mdl-navigation__link" href="">Autres</span>
          <a class="mdl-navigation__link" href="">je sais pas quoi mettre</a>
        </nav>
      </div>

      <div class="mdl-layout__content installation">
<?php
            require_once "php/read_md.php";
            echo Markdown(file_get_contents("../README.md"));
?>
      </div>
    <footer class="mdl-mega-footer">
            <div class="mdl-mega-footer--top-section">
                <div class="mdl-mega-footer--right-section">
                  <a class="mdl-typography--font-light" href="#top">
                    Back to Top
                    <i class="material-icons">expand_less</i>
                  </a>
                </div>
                <div class="mdl-mega-footer--middle-section">
                    <p style="text-align: center;" class="mdl-typography--font-light">Satellite imagery: © 2014 Astrium, DigitalGlobe</p>
                </div>
            </div>
        </footer>
  </body>
</html>