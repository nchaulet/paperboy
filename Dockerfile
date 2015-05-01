FROM iojs
WORKDIR /app
RUN npm install -g nodemon babel
CMD nodemon --exec babel-node index.js
