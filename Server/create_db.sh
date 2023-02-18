# !/bin/bash
#!/usr/bin/env bash

source .env

mysql -u "root" -p$DB_PASSWORD< "./scripts/clean_db.sql"
mysql -u "root" -p$DB_PASSWORD < "./scripts/create_db.sql"
node < "./fill_data.js"