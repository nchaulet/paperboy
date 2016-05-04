import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "app/app";

const Server = function(dataStore) {
  const app = express();

  app.set('views', './template')
  app.set('view engine', 'jade');

  app.get('/', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;
    dataStore.getItems(page, nbByPage).then((items) => {
      dataStore.countTotalItems().then((total) => {
        const body = ReactDOMServer.renderToString(
          <App items={items} page={page} />
        );
        res.render('index', { body: body});
      });
    });
  });

  app.get('/api/items', (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;
    dataStore.getItems(page, nbByPage).then((items) => {
        dataStore.countTotalItems().then((total) => {
            res.send({
                data: items,
                total: total,
                page: page
            });
        });
      });
  });

  console.log('Server listening on port 8080');
  app.listen(8080);
};

export default Server;
