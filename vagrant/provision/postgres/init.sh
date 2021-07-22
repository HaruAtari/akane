#!/bin/bash

echo "Init database state"

username=akane_loc
password=pass
database=akane_loc

if [ ! $(psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$username'") ]; then
  psql <<-EOSQL
    CREATE USER $username LOGIN SUPERUSER PASSWORD '$password';
EOSQL
fi

if [ ! $(psql -tAc "SELECT 1 FROM pg_database WHERE datname='$database'") ]; then
  psql <<-EOSQL
    CREATE DATABASE $database;
    GRANT ALL PRIVILEGES ON DATABASE $database TO $username;
EOSQL
fi
