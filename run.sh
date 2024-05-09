#!/bin/bash

dockers=("nginx" "php" "mariadb" "phpmyadmin")
commandes=("start" "stop" "restart" "rm" "network")

_completion() {
    local cur=${COMP_WORDS[COMP_CWORD]}
    local prev=${COMP_WORDS[COMP_CWORD-1]}

    case "$prev" in
        start|stop|restart|rm)
            local opts="${dockers[*]}"
            COMPREPLY=($(compgen -W "$opts" -- "$cur"))
            ;;
        network)
            ;;
        *)
            local opts="${commandes[*]}"
            COMPREPLY=($(compgen -W "$opts" -- "$cur"))
            ;;
    esac
}

complete -F _completion -o default ./run.sh

if [[ $0 != "$BASH_SOURCE" ]]; then
    return
fi

cmd=$1
docker=$2

if [[ $cmd == "" ]]; then
    echo "please set a commande"
    echo "${commandes[*]}"
fi

if [[ $cmd == "network" ]]; then
    docker network create website-network
fi

exist=false
if [[ $docker != "" ]]; then
    for name in "${dockers[@]}"; do
        if [ "$name" == "$docker" ]; then
            exist=true
            break
        fi
    done

    if [[ $exist == false ]]; then
        echo "Aucun docker à ce nom n'existe"
        exit 0
    fi
fi

case "$cmd" in
    stop)
        if [[ $docker != "" ]]; then
            docker stop $docker
        else
            for container in "${dockers[@]}"; do
                docker stop $container
            done
        fi
        ;;
    rm)
        if [[ $docker != "" ]]; then
            docker stop $docker && docker rm $docker
        else
            for container in "${dockers[@]}"; do
                docker stop $container && docker rm $container
            done
        fi
        ;;
    restart)
        if [[ $docker != "" ]]; then
            docker restart $docker
        else
            for container in "${dockers[@]}"; do
                docker restart $container
            done
        fi
        ;;
    start)
        if [[ $docker == "nginx" || $docker == "" ]]; then
            docker run \
            --network website-network \
            -d -p 80:80 -p 443:443 \
            --restart unless-stopped \
            --name nginx \
            -v ~/Documents/my_projects/web_site/html:/etc/nginx/html \
            -v /ssl/:/ssl/ \
            jerem0027/nginx:1.24.2
        fi

        if [[ $docker == "php" || $docker == "" ]]; then
            docker run \
            --network website-network \
            -d --restart unless-stopped \
            --name php \
            -v ~/Documents/my_projects/web_site/html:/etc/nginx/html \
            --env-file configs/php.env \
            jerem0027/php:8.2
        fi

        if [[ $docker == "mariadb" || $docker == "" ]]; then
            docker run \
            --network website-network \
            -d -p 3306:3306 \
            --restart unless-stopped \
            --name mariadb \
            --env-file configs/mariadb.env \
            -v db_content:/var/lib/mysql \
            jerem0027/mariadb:10.3.39
        fi

        if [[ $docker == "phpmyadmin" || $docker == "" ]]; then
            docker run \
            --network website-network \
            -d --restart unless-stopped \
            --name phpmyadmin \
            -v /ssl/:/etc/apache2/ssl/ \
            --env-file configs/phpmyadmin.env \
            jerem0027/phpmyadmin:5.2.2
        fi
        ;;
esac
