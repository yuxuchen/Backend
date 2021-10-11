const http = require('http')
const serverHandler = require('../app')
const server = http.createServer(serverHandler)

const PORT = 8000

server.listen(PORT)