FROM node:6

WORKDIR /app
RUN npm install -g nodemon
VOLUME ["/data"]
CMD nodemon --exec NODE_PATH=. node index.js

EXPOSE 8080
