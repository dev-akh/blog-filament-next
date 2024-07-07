#!/bin/bash

SERVER_ENV_FILE="./server/.env"
SOCKET_ENV_FILE="./socket/.env"

if [ -f "$SERVER_ENV_FILE" ]; then
    export $(grep -v '^#' ./server/.env | xargs)
else
    echo "Error: .env file not found in $SERVER_ENV_FILE."
    exit 1
fi

if [ ! -f "$SOCKET_ENV_FILE" ]; then
    echo "Error: .env file not found in $SOCKET_ENV_FILE."
    exit 1
fi

# Check required variables
if [ -z "${APP_NAME}" ] || [ -z "${WEB_PORT_HTTP}" ] || [ -z "${DB_USERNAME}" ]; then
    echo "Required environment variables not found in .env file.(APP_NAME,WEB_PORT_HTTP,DB_USERNAME)"
    exit 1
fi

echo "Initializing your app: ${APP_NAME}"
echo "DB Username: ${DB_USERNAME}"

open_appurl="http://localhost:${WEB_PORT_HTTP}"
open_pmaurl="http://localhost:${PMAHOST_PORT}"

# Validate DB_USERNAME
if [[ "${DB_USERNAME}" == "root" ]]; then
    echo "Database username should not be ROOT."
    exit 1
else
    echo "Application will connect to the database with ${DB_USERNAME}."
fi

# Check if Docker container exists
if [ ! "$(docker ps -aq -f name=weone_blog)" ]; then
    echo "Building and starting Docker containers..."
    docker-compose -f ./docker-compose.yml build --no-cache
    docker-compose -f ./docker-compose.yml up -d
    echo "Backend containers started."
else
    echo "Docker container weone_blog already exists."
    echo "Restarting containers..."
    docker-compose -f ./docker-compose.yml restart weone_blog
    docker-compose -f ./docker-compose.yml restart weone_blog_DB
    docker-compose -f ./docker-compose.yml restart weone_blog_PMA
    docker-compose -f ./docker-compose.yml restart weone_blog_socket
    echo "Containers restarted."
fi

echo "Access your app at: ${open_appurl}"
echo "Access your database ui at: ${open_pmaurl}"
echo "Access your frontend web at: ${open_weburl}"
echo "============== Application is successfully built! ============"
