const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const globalProfileSchema = mongoose.Schema({
    userId: reqString,
})

module.exports = mongoose.model('global profiles', globalProfileSchema)