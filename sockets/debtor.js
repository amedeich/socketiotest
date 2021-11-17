const fetch = require('node-fetch')

const creditRequests = async ({ prodId, documentType, documentNumber }, callback) => {
    let response = null

    try {
        const request = await fetch(
            `${process.env.API_URL}/mcd/v1.0.0/microcredit/debtor/requestbydocument/${prodId}/${documentType}/${documentNumber}`,
            {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.API_KEY
                }
            }
        )

        if (!request.ok) {
            throw new Error('Error')
        }

        const data = await request.json()

        response = { data: data.data, error: null }
    } catch (error) {
        response = { data: null, error: true }
    } finally {
        callback(response)
    }
}

module.exports = {
    creditRequests
}
