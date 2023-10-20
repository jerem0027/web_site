# Raspberry Pi 3B+

## Prérequis
<br>

Mise a jours des paquets
```bash
sudo apt-get update
sudo apt-get upgrade
```
<br>

## Connection SSH
<br>

### Activer le SSH sur le raspberry
```bash
sudo raspi-config
# Interfacing Options -> SSH -> Yes
```
Ou voir [ce lien](https://raspberry-pi.fr/activer-ssh/)
<br><br>

### Mise en place de la clé SSH
 1. Sur ta machine
```bash
ssh-keygen
# Choisir ou sera placé la clé
# Choisir la passehrase
```
 2. Envoi de la clé au Raspberry
```bash
ssh-copy-id -i chemin_de_la_cle/cle.pub utilisateur@ip_raspberry
# ssh-copy-id -i /home/jeremie/cle.pub pi@192.168.1.??
```
 3. Parametrer la connection
```bash
mkdir ~/.ssh
touch ~/.ssh/config

# Ajouter cette configuration
# Host pseudo_connection
#     User user_name
#     Hostname ip_raspberry
#     Port num_port
#     IdentityFile path_to_private_key
```
<br>

### Securisé la connection SSH

 > **Important :** Garder un terminal de secours, la connection via authentification va etre supprimé, on ne pourra donc plus se connecter en SSH si la clé a mal été envoyé !

Sur le Raspberry
 1. ```sudo nano /etc/ssh/sshd_config```
 2. Changer le port 22 pour un port au choix
 3. chercher la ligne "PasswordAuthentication", la decommenter et le mettre à "no"
 4. Relancer service ssh : ```sudo service ssh restart```

<br>

## Server Web
<br>

### Installer apache2
```bash
sudo apt install apache2
sudo chown -R {{nom utilisateur}}:www-data /var/www/html/
sudo chmod -R 770 /var/www/html/

# Verifier qu'apache est activé
wget -O verif_apache.html http://127.0.0.1
cat ./verif_apache.html
```
<br>

### Installer PHP
```bash
sudo apt install php php-mbstring

# Verifier que php fonctionne
sudo rm /var/www/html/index.html
sudo echo "<?php phpinfo(); ?>" > /var/www/html/index.php
# une page de version php devrait apparaitre à l'adresse http://127.0.0.1 ou http://127.0.0.1:80
```


## DEV
```sh
cd repo/
virtualenv -p python3.8 ./dev-env
source ./dev-env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

