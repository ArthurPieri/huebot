FROM node
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8443
CMD ["node", "app.js"]