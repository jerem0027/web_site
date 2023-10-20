<aside>
  <div class="sidenav">
  <form action="create.php" method="POST">
    <input class="button1" type="submit" value="Nouvel article">
  </form>
    <div class="lienAside">
      <span class="categorie"><b><u>Catégories:</u></b></span>
<?php
      # CONNECTION BD
      $dbfactory = new \Rediite\Model\Factory\dbFactory();
      // Recuperation des catagories
      $stmt = $dbfactory->requete("SELECT * FROM Categorie ORDER BY name;");

      foreach ($stmt->fetchAll() as $cat) {
        if(!empty($cat['NAME']))
          echo "<a href='home.php?filter=".$cat['NAME']."'>".$cat['NAME']."</a>";
      }
    ?>
    </div>
  </div>
</aside>
        
