FROM node:4.2

WORKDIR /app
RUN npm install -g nodemon babel
VOLUME ["/data"]
CMD nodemon --exec NODE_PATH=. babel-node index.js
