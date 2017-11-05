FROM node:8.9

VOLUME ["/data"]

RUN npm install -g nodemon
RUN npm install -g yarn

WORKDIR /app
ADD ./package.json /app/package.json
RUN yarn install

CMD nodemon --exec NODE_PATH=. node index.js

EXPOSE 8080
