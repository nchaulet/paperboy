import express from "express";

var Server = function(dataStore) {
    var app = express();

    app.set('views', './template')
    app.set('view engine', 'jade');

    app.get('/', (req, res) => {

        var page = parseInt(req.query.page, 10) || 1;
        var nbByPage = 20;
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

    console.log('Server listening on port 8080');
    app.listen(8080);
};

export default Server;
