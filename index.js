(function (lang, tfIdf, server) {
    "use strict";
    server(1234, function (socket) {
        lang.stream.pipe(tfIdf(socket), socket);
    });
})(require('cosy-lang'), require('./lib/tf-idf'), require('./lib/socket-server').server);