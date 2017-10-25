import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "app/app";
import { Provider } from 'react-redux';
import createStore from 'app/store';
import {Map, List} from "immutable";
import Mailer from "./mailer";

const Server = function(dataStore) {
  const app = express();

  app.set('views', './template')
  app.set('view engine', 'pug');
  app.use('/dist', express.static('dist'));
  app.use(express.static('public'));

  app.get('/', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;

    dataStore.getItems(page, 20, {})
      .then(data => {
          const state = {
            items: new Map({
              items: new List(data.items),
              total: data.total,
              fetching: false,
              page: page
            })
          };
          const store = createStore(state);

          const body = ReactDOMServer.renderToString(
            <Provider store={store}>
              <App />
            </Provider>
          );

          res.render('index', {body, state});
      });
  });

  app.get('/api/items', (req, res, next) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;

    const filters = {};
    filters.providers = req.query.providers || [];

    if (req.query.query) {
      filters.query = req.query.query;
    }

    dataStore.getItems(page, nbByPage, filters)
      .then(data => {
        res.send({
            data: data.items,
            total: data.total,
            page: page
        });
      })
      .catch(next);
  });

  console.log('Server listening on port 8080');
  app.listen(8080);
};

export default Server;
