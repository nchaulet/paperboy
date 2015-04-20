FROM iojs
WORKDIR /app
RUN npm install -g nodemon
CMD nodemon index.js
