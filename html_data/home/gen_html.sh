#!/bin/bash

node ../../tools/create_file.js ./templates/index.html.handlebars ./home.yml ../../html/home/index.html
node ../../tools/create_file.js ./templates/inscription.html.handlebars ./home.yml ../../html/home/inscription.html
node ../../tools/create_file.js ./templates/guest.html.handlebars ./home.yml ../../html/home/guest.html
node ../../tools/create_file.js ./templates/about_us.html.handlebars ./home.yml ../../html/home/about_us.html
node ../../tools/create_file.js ./templates/account.html.handlebars ./home.yml ../../html/home/account.html
