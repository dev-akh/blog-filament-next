# Blog System

## Backend (Server)
- Path : /server/
- PHP, Laravel, Filament

## Frontend (web)
- Path : /web/
- Next

## Clone Project
Go desired folder and paste - enter command below
```
git clone https://github.com/dev-akh/blog-filament-next.git
```

## Generating Client Credentials
- Run the following command on termianl 
- Path : /project-root/server
```
php artisan passport:client --password
```
Add the generated `id` and `secret` keys in .env file
```
PASSPORT_PERSONAL_ACCESS_CLIENT_ID=
PASSPORT_PERSONAL_ACCESS_CLIENT_SECRET=
```
After adding client credentials to .env file
```
php artisan config:cache
```
## Sending Notification Email 
- Add email server credentials in .env file 
- Ref: https://mailtrap.io for mail server (dev mode)
```
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="no-reply@weone.local"
MAIL_FROM_NAME="${APP_NAME}"
```
