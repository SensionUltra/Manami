const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const globalProfileSchema = mongoose.Schema({
    userId: reqString,
    client: {
        restartMessage: {
            channel: {
                required: false
            },
            message: {
                required: false
            },
            required: false
        },
        required: false
    }
})

module.exports = mongoose.model('global profiles', globalProfileSchema)