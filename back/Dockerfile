<<<<<<< HEAD
FROM node:alpine
=======
FROM alpine
>>>>>>> 1cb941db270965f5cbac0ccd2b54935ee96b7bce

RUN apk update
RUN apk add nodejs
RUN apk add npm

RUN mkdir /root/app
WORKDIR /root/app
<<<<<<< HEAD
COPY ./ /root/app

RUN npm install
EXPOSE 80

CMD [ "npm","start" ]
=======
COPY * /root/app

RUN npm install
EXPOSE 3333

CMD npm start
>>>>>>> 1cb941db270965f5cbac0ccd2b54935ee96b7bce
