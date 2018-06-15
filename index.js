const {SocketServer, HttpServer} = require('./NET')
const {FileWatcher} = require('./Filesystem');

var x = new FileWatcher(__dirname)