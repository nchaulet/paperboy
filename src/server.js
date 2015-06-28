import express from "express";

var Server = function(dataStore) {
    var app = express();

    app.set('views', './template')
    app.set('view engine', 'jade');

    app.get('/', (req, res) => {

        var page = req.query.page || 1;

        dataStore.getItems(page).then((items) => {
            dataStore.countTotalItems().then((total) => {
                res.render('items', {
                    items: items,
                    total: total,
                    page: page
                });
            });
        });
    });

    app.listen(8080);
};

export default Server;
