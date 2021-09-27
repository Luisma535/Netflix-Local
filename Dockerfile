FROM node

WORKDIR /netflix

RUN npm start
SHELL ["node", "server.js" ]