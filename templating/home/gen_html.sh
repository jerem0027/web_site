#!/bin/bash

# Home
node ../../tools/create_file.js ./templates/home/index.html.handlebars ./home.yml ../../html/home/index.html
node ../../tools/create_file.js ./templates/home/inscription.html.handlebars ./home.yml ../../html/home/inscription.html
node ../../tools/create_file.js ./templates/home/about_us.html.handlebars ./home.yml ../../html/home/about_us.html
node ../../tools/create_file.js ./templates/home/account.html.handlebars ./home.yml ../../html/home/account.html
node ../../tools/create_file.js ./templates/home/connection.html.handlebars ./home.yml ../../html/home/connection.html


# Secret santa
node ../../tools/create_file.js ./templates/secret_santa/guest.html.handlebars ./secret_santa.yml ../../html/secret_santa/guest.html
node ../../tools/create_file.js ./templates/secret_santa/index.html.handlebars ./secret_santa.yml ../../html/secret_santa/index.html
