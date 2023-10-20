#!/bin/bash

repo=marvel-fan
node ../tools/create_file.js ./${repo}/templates/actors.html.handlebars  ./${repo}/data/acteurs.yml ../html/${repo}/actors.html 
node ../tools/create_file.js ./${repo}/templates/temoignage.html.handlebars  ./${repo}/data/temoignage.yml ../html/${repo}/temoignage.html
node ../tools/create_file.js ./${repo}/templates/stones.html.handlebars  ./${repo}/data/stones.yml ../html/${repo}/stones.html
node ../tools/create_file.js ./${repo}/templates/contact.html.handlebars  ./${repo}/data/contact.yml ../html/${repo}/contact.html
node ../tools/create_file.js ./${repo}/templates/index.html.handlebars  ./${repo}/data/films.yml ../html/${repo}/index.html