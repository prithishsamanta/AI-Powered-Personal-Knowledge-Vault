FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

EXPOSE 3001

CMD ["npm", "start"]