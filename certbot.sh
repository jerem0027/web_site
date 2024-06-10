#!/bin/sh

DOMAIN=${DOMAIN:-"jeremiehenrion.eu"}

if [ ! -f /etc/letsencrypt/live/$DOMAIN/fullchain.pem ]; then
    echo "###########################"
    echo "#### CREATE CERTIFICAT ####"
    echo "###########################"
    certbot certonly --webroot -w /var/www/certbot \
    --email jeremie.henrion@gmail.com \
    --agree-tos --no-eff-email --non-interactive --force-renew\
    -d $DOMAIN 2>/dev/null
    chmod -R 755 /etc/letsencrypt/*
    sleep 10d
fi

while :; do
    echo "###########################"
    echo "#### RENEW CERTIFICATS ####"
    echo "###########################"
    certbot certificates 2>/dev/null
    certbot renew \
    --deploy-hook "chmod -R 755 /etc/letsencrypt/*" 2>/dev/null
    sleep 5d
done