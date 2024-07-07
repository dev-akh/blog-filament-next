FROM php:8.2-apache

RUN apt-get update && apt-get install -qyy \
    git \
    zip \
    curl \
    sudo \
    unzip \
    libicu-dev \
    libbz2-dev \
    libpng-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libreadline-dev \
    libfreetype6-dev \
    libxml2-dev \
    zlib1g-dev \
    libzip-dev \
    default-mysql-client \
    cron \
    nano \
    g++

COPY .docker/apache_default.conf /etc/apache2/sites-available/000-default.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

ARG app_name
ENV APACHE_DOCUMENT_ROOT=/var/www/html/weone_blog
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite headers

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
WORKDIR /var/www/html/weone_blog

RUN docker-php-ext-configure intl
RUN docker-php-ext-install pdo pdo_mysql zip intl

COPY --from=composer:2.2.10 /usr/bin/composer /usr/bin/composer

ARG uid
RUN useradd -G www-data,root -u ${uid} -d /home/devuser devuser
RUN mkdir -p /home/devuser/.composer && \
    chown -R devuser:devuser /home/devuser
COPY . /var/www/html/weone_blog

RUN composer clear-cache
# RUN composer install

RUN chmod -R 777 storage && \
    chmod -R 777 bootstrap

# RUN php artisan key:generate && \
#     php artisan storage:link && \
#     php artisan optimize

CMD ["apache2-foreground"]

RUN echo "================Building Backend image is successfully completed================="
