FROM node:22

WORKDIR /app

COPY package*.json ./
COPY server.js .
COPY index.html .
COPY rate-limit/ ./rate-limit/
COPY routes/ ./routes/

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]
