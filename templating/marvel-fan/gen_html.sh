#!/bin/bash

repo=marvel-fan
node ../../tools/create_file.js ./templates/actors.html.handlebars  ./data/acteurs.yml ../../html/marvel-fan/actors.html 
node ../../tools/create_file.js ./templates/temoignage.html.handlebars  ./data/temoignage.yml ../../html/marvel-fan/temoignage.html
node ../../tools/create_file.js ./templates/stones.html.handlebars  ./data/stones.yml ../../html/marvel-fan/stones.html
node ../../tools/create_file.js ./templates/contact.html.handlebars  ./data/contact.yml ../../html/marvel-fan/contact.html
node ../../tools/create_file.js ./templates/index.html.handlebars  ./data/films.yml ../../html/marvel-fan/index.html