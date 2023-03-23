FROM ubuntu:latest

RUN apt-get update
RUN apt-get -y install nginx

COPY index.html /var/www/html/index.html

CMD ["nginx", "-g", "daemon off;"]
