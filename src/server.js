import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "app/app";

const Server = function(dataStore) {
  const app = express();

  app.set('views', './template')
  app.set('view engine', 'jade');
  app.use('/dist', express.static('dist'));
  app.get('/', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;
    dataStore.getItems(page, nbByPage).then((items) => {
      dataStore.countTotalItems().then((total) => {
        const PROPS = {
          items: items,
          page: page
        };
        const body = ReactDOMServer.renderToString(
          React.createElement(App, PROPS)
        );
        res.render('index', { body: body, props: PROPS});
      });
    });
  });

  app.get('/api/items', (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;

    const filters = {};
    if (req.query.provider) {
      filters.provider = req.query.provider;
    }

    dataStore.getItems(page, nbByPage, filters).then((items) => {
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
