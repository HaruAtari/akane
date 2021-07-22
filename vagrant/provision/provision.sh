#!/bin/bash

set -x

# Preinstall all required apps
sudo apt-get -y install zip unzip

# Preinstall all required repos
# NodeJs
curl -fsSL https://deb.nodesource.com/setup_16.x |sudo  bash -
# PHP
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/sury-php.list
wget -qO - https://packages.sury.org/php/apt.gpg | sudo apt-key add -

sudo apt-get -y update

# Install PHP
sudo apt-get -y install php8.0-fpm php8.0-cli php8.0-intl php8.0-zip php8.0-curl \
php8.0-xml php8.0-mbstring php8.0-common php8.0-pgsql php8.0-gd

# Install composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
mv -f composer.phar /usr/local/bin/composer
composer global require "fxp/composer-asset-plugin"

# Install Nginx
sudo apt-get -y install nginx
sudo cp /vagrant/provision/nginx/akane.loc.conf /etc/nginx/sites-enabled/akane.loc.conf
sudo service nginx restart

# Install Postgres
sudo apt-get -y install postgresql
echo -e "pass\npass" | sudo passwd postgres
sudo -u postgres sh /vagrant/provision/postgres/init.sh

# Install nodejs
sudo apt-get -y install nodejs

# Install npm packages
sudo npm install --silent -g yarn

# Install app
cd /var/www/akane.loc
mkdir runtime -m 777 -p
chmod 777 update.sh
sh update.sh dev
