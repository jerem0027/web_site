# My website

This is a website project host on my raspberry

### Objectives

Present my work (like CV), and developpe my skill in:

- HTML/CSS
- JS
- PHP
- NETWORK

### Docker Services


| Service   | Version   |
|-----------|-----------|
| nginx     | 1.27.0    |
| php       | 8.3.8     |
| mariadb   | 10.11.8   |
| phpmyadmin| 5.2.1     |
| certbot   | v2.11.0   |

### Task

- [ ] Auto save and deploy database
- [ ] Automatisation deploy
- [ ] Secret santa Pages
  - [x] index
  - [ ] guest
      - [ ] Add button "add to account"
  - [x] create
  - [ ] manage
- [ ] Update button design

### Technology

- HTML 5
- CSS 3
- JS
- PHP 7
- Docker / Docker-compose
- Handlebars
- Node 10

### Templating

Use Handlabars and Yaml with js-yaml

```sh
sudo npm install -g npm to update
npm install js-yaml
```

### Run cmd

dockers: nginx, php, mariadb, phpmyadmin
all cmd: start, stop, restart, rm, network

```sh
./run <cmd> <docker> 
./run start nginx
./run stop mariadb

./run network
./run start
```

### Backup BD

```sh
# Verify Mountpoint folder
docker volume inspect web_site_db_content

# Create archive
sudo tar -cvzf archive_db.tar.gz -C /var/lib/docker/volumes/web_site_db_content/ _data

# Push backup
sudo tar -xvf archive_db.tar.gz -C /var/lib/docker/volumes/web_site_db_content/

```
### Contribution

- Jérémie Henrion
