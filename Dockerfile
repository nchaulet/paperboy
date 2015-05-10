FROM iojs
WORKDIR /app
RUN npm install -g nodemon babel
VOLUME ["/data"]
CMD nodemon --exec babel-node index.js
