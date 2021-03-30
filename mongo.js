const mongoose = require('mongoose')
const { mongooseString } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(mongooseString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
    })
    return mongoose
}