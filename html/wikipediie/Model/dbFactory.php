<?php

namespace Rediite\Model\Factory;

if (isset($_ENV["MYSQL_ROOT_PASSWORD"])) {
  define("PASS", $_ENV["MYSQL_ROOT_PASSWORD"]);
}
else {
  define("PASS", "root1");
}

class dbFactory{
  private $dbname = "wikipediie";
  private $host = "mariadb";
  private $port = 3306;
  private $password = PASS;
  private $id = "root";

  // connection a la bd
  function createService() {
    return new \PDO("mysql:dbname=".$this->dbname.";host=".$this->host.";port=".$this->port, $this->id, $this->password);
  }

  // envoi de la requetes passé en parametre
  function requete($requete) {
    $co = $this->createService();
    $stmt = $co->prepare($requete);
    $stmt->execute();
    return $stmt;
  }
}
