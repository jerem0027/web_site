<?php
header("Content-Type: application/json");

echo json_encode(array('masterkey' => $_ENV["MASTERKEY"]));

?>