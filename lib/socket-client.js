
module.exports = (function (lang, socketClient) {
	"use strict";

	lang.protocol.extend(lang.stream.IStream, socketClient.SocketNamespace,
		["tap", function (socket, fn) {
			socket.on("message", function (data) {
				fn(JSON.parse(data));
			});
		}],
		["emit", function (socket, val) {
			socket.send(JSON.stringify(val));
		}]
	);

	function client(addr, callback) {
		var io = socketClient.connect(addr);
		io.on('connect', function () {
			callback(io);
		});
	}
	return {
		client: client
	};
})(require('cosy-lang'), require('socket.io-client'));
