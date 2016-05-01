import express from "express";

const Server = function(dataStore) {
  const app = express();

  app.set('views', './template')
  app.set('view engine', 'jade');

  app.get('/', (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const nbByPage = 20;
      dataStore.getItems(page, nbByPage).then((items) => {
        dataStore.countTotalItems().then((total) => {
            res.render('items', {
                items: items,
                total: total,
                nbByPage: nbByPage,
                page: page
            });
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
