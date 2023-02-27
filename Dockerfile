FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --silent

COPY . .

EXPOSE 4444

CMD npm start
