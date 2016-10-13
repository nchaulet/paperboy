FROM node:6

VOLUME ["/data"]

WORKDIR /app
ADD ./package.json /app/package.json
RUN npm install
RUN npm install -g nodemon
CMD nodemon --exec NODE_PATH=. node index.js

EXPOSE 8080
