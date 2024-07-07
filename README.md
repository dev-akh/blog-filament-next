# Blog 

## Overview
This project is a blog system built with Laravel for the backend, Next.js for the frontend, and Node.js for the socket server.

## Table of Contents
- [Overview](#overview)
- [Backend (Server)](#backend-server)
- [Frontend (Web)](#frontend-web)
- [Socket Server](#socket-server)
- [Clone Project](#clone-project)
- [Requirements](#requirements)
- [Build Project](#build-project)
  - [Docker Compose](#docker-compose)

## Backend (Server)
- Path: `/server/`
- Built with PHP, Laravel, and Filament.

## Frontend (Web)
- Path: `/web/`
- Built with Next.js.

## Socket Server
- Path: `/socket/`
- Built with Node.js.

## Clone Project
To clone the project, navigate to your desired folder and run:
```
git clone https://github.com/dev-akh/blog-filament-next.git
```
# Backend 
## Requirements
- Docker 
- Docker Compose 

## Build Project 
### Configure .env variable before building project
- copy `/server/.env.example` to `/server/.env`
- copy `/socket/.env.example` to `/socket/.env`
Get keys from [Mailtrap.io](https://mailtrap.io/) for sending email 
Put the credentials keys at `/server/.env`
```
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=aa86a8f910db6b
MAIL_PASSWORD=6a49d88d65bd3e
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@weone.local"
MAIL_FROM_NAME="${APP_NAME}"
```

### For Ubuntu or Mac ( Linux ) || For window - Open with GitBash terminal
- Go to the project directory `/blog-filament-next`
- Run the following command in terminal
- `./setup.sh` for Backend and Socket server
### Run necessary commands
```
    docker-compose exec api composer install
    docker-compose exec api php artisan key:generate
    docker-compose exec api php artisan storage:link
    docker-compose exec api php artisan optimize
    docker-compose exec api php artisan migrate
    docker-compose exec api php artisan db:seed
```
### Add Client Acces Keys
```
docker-compose exec api php artisan passport:client --password
```
Add the generated `id` and `secret` keys in .env file
```
PASSPORT_PERSONAL_ACCESS_CLIENT_ID=
PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=
```
#### After adding client keys in .env file 
Run the following commands to cache clear
```
docker-compose exec api php artisan config:cache
```
## Restart Project 
- Go to the project directory `/blog-filament-next`
- Run the following command in terminal
- `./setup.sh` for Backend and Socket server

## Down Project 
- Go to the project directory `/blog-filament-next`
- Run the following command in terminal
- `docker-compose down` for Backend and Socket server

## Access the backend sides 
- Negavite to `http://localhost:8080` for backend
- Negavite to `http://localhost:8081` for phpmyadmin

## Credentails
#### Backend
```
Email : `admin@localhost.com`
Password:  `password`
```
#### PHPMyAdmin
```
Username : `weone`
Password:  `password`
```
# Frontend
## Requirements
- Node version 18 or 20 
- npm 

## Running Project 
### Configure .env variable before building project
- copy `/web/.env.example` to `/web/.env`
```
NEXT_PUBLIC_API_BASE_URL  = "http://localhost:8080" 
NEXT_PUBLIC_IMAGE_DOMAINS = "http://localhost:8080"
NEXT_PUBLIC_SOCKET_URL  = "http://localhost:3001"
```
##### Then run the following command
- Current directory is `/blog-filament-next/web`
- `npm install`
- `npm run dev`

## Access the front side 
- Negavite to `http://localhost:3000` for frontend

If you have any questions, don't be hesitate to contact to [dev.aungkyawhtwe@gmail.com](dev.aungkyawhtwe@gmail.com).