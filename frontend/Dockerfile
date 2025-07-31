FROM node:24 

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install to avoid architecture issues
RUN rm -rf node_modules package-lock.json
RUN npm install

# Copy source files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]