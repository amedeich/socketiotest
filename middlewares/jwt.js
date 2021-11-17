const jwt = require('jsonwebtoken')

const jwksClient = require('jwks-rsa')

const client = jwksClient({
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
})

const validateJwt = (socket, next) => {
    if (socket.handshake.query && socket.handshake.query.token) {
        function getKey(header, callback) {
            client.getSigningKey(header.kid, function (err, key) {
                var signingKey = key.publicKey || key.rsaPublicKey
                callback(null, signingKey)
            })
        }
        jwt.verify(socket.handshake.query.token, getKey, { algorithms: ['RS256'] }, function (err, decoded) {
            if (err) {
                console.info(err)
                return next(new Error('Authentication Error'))
            }
            socket.decoded = decoded
            next()
        })
    } else {
        console.info('Token missing')
        next(new Error('Authentication Error'))
    }
}

module.exports = {
    validateJwt
}
