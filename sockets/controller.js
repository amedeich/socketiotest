const { creditRequests } = require('./debtor')

const socketController = (socket) => {
    socket.on(`user-debtor-request-${socket.decoded.sub}`, ({ prodId, documentType, documentNumber }, callback) => {
        creditRequests({ prodId, documentType, documentNumber }, (resp) => {
            callback(resp)
            socket.broadcast.emit(`user-debtor-request-${socket.decoded.sub}`, resp)
        })
    })
}

module.exports = {
    socketController
}
