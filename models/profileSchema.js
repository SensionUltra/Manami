const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const profileSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    coins: {
        type: Number,
        default: 0
    },
    items: {
        type: [Object],
        required: false
    },
    xp: {
        type: Number,
        defualt: 0
    },
    level: {
        type: Number,
        defualt: 1,
    }
})

module.exports = mongoose.model('profiles', profileSchema)