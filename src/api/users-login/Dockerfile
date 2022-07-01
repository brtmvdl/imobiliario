FROM node:lts-alpine

ENV DATA_PATH=${DATA_PATH}

WORKDIR /app

COPY . .

CMD node /imobiliario/commons/server.js 2>> /imobiliario/logs/${HOSTNAME}.error.log
