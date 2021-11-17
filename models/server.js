const { socketController } = require('../sockets/controller')
const { jwt } = require('../middlewares')

class Server {
    constructor() {
        this.port = process.env.PORT
        this.server = require('http').createServer((req, res) => res.end())
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: '*'
            },
            transports: ['websocket'],
            path: '/socket.io'
        })

        this.paths = {}

        // Middlewares
        this.middlewares()

        // Sockets
        this.sockets()
    }

    middlewares() {
        this.io.use(jwt.validateJwt)
    }

    sockets() {
        this.io.on('connection', socketController)
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running at port: ', this.port)
        })
    }
}

module.exports = Server
