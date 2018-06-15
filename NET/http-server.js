// Make FtP Server
// - No dependencies
// - Use Filewatcher (fs)
// - Use streams
// - Use cluster
// - Use Async

const {createServer} = require('net');
const {watch} = require('fs')

let StartServer = async () => {
    let server = createServer({allowHalfOpen: true, pauseOnConnect: true}, async (socket) => {

        socket.on('connect', async () => {
            console.log('socket connected');
        })
    })

    server.listen(80, 'localhost');
    server.on('listening', () => {
        console.log('Started server on', server.address())
    })

    // Todo: Move to FileSystem
    let fileWatcher = watch("C:\\")
    fileWatcher.on('change', (eventType, filename) => {
        console.log(eventType, filename)
    })
    fileWatcher.on('error', (error) => {
        console.log(`Error with filewatcher`, error.stack)
    })
}



module.exports = () => StartServer();