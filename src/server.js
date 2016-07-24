import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "app/app";
import { Provider } from 'react-redux';
import createStore from 'app/store';
import {Map, List} from "immutable";


const Server = function(dataStore) {
  const app = express();

  app.set('views', './template')
  app.set('view engine', 'jade');
  app.use('/dist', express.static('dist'));
  app.get('/', (req, res) => {

    const page = parseInt(req.query.page, 10) || 1;

    dataStore.getItems(page, 20, {})
      .then((items) => {
        return dataStore.countTotalItems().then((total) => {
          const state = {
            items: new Map({
              items: new List(items),
              total: total,
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
