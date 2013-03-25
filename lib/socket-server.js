
module.exports = (function (lang, socketServer) {
	"use strict";

	lang.protocol.extend(lang.stream.IStream, socketServer.Socket,
		["tap", function (socket, fn) {
			socket.on("message", function (data) {
				fn(JSON.parse(data));
			});
		}],
		["emit", function (socket, val) {
			socket.send(JSON.stringify(val));
		}]
	);

	function server(port, callback) {
		var io = socketServer.listen(port);

		io.sockets.on('connection', callback);
	}

	return {
		server: server
	};
})(require('cosy-lang'), require('socket.io'), require('socket.io-client'));
