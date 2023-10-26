#!/bin/bash

node ../../tools/create_file.js ./templates/index.html.handlebars ./none.yml ../../html/home/index.html
node ../../tools/create_file.js ./templates/inscription.html.handlebars ./none.yml ../../html/home/inscription.html
node ../../tools/create_file.js ./templates/guest.html.handlebars ./none.yml ../../html/home/guest.html
node ../../tools/create_file.js ./templates/abous_us.html.handlebars ./none.yml ../../html/home/about_us.html

