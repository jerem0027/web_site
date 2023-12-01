<?php
header("Content-Type: application/json");

// Set constante for request
define('URL_API', 'https://jeremiehenrion.serveblog.net/api/v1/identity/masterkey/');

// Initialisation cURL session
$curl = curl_init(URL_API);

// Header Configuration
$options = [
    CURLOPT_HTTPHEADER => ['Content-type: application/json', 'APIKEY:'.$_ENV["MASTERKEY"]],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
];

curl_setopt_array($curl, $options);

// Execute cURL
$response = curl_exec($curl);

// Check requestion respond
if (!str_contains($response, "502 Bad Gateway") && "$response" !== "") {
    echo $response;
} else {
    echo json_encode(array('error' => array("massage" => "API not responding", "type" => "ServerError", "code" => 500), "message" => "API not responding"));
}

// Close cURL session
curl_close($curl);
?>
