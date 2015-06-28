import express from "express";

var Server = function() {
    var app = express();

    app.listen(8080);
};

export default Server;
