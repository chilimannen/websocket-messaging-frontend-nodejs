/**
 * @author Robin Duda
 *
 * Plain webserver to serve up the view.
 */

var app = require('../../app');
var http = require('http');
var params = require('./../params');

var port = normalizePort(params.webserver.port);
app.set('port', port);
var server = http.createServer(app);

console.log("Frontend running on port " + params.webserver.port);
server.listen(port);
server.on('error', onError);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
