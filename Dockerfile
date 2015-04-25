FROM iojs
WORKDIR /app
RUN npm install -g nodemon babel
CMD nodemon --delay 2.5 --exec babel-node index.js
