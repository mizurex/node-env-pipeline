FROM node:22

WORKDIR /app

# Copy only package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the server file
COPY server.js .

EXPOSE 3000

CMD ["npm", "run", "dev"]
