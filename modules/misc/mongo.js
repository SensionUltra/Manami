const mongoose = require('mongoose')
const { mongooseString } = require('@root/token.json')

module.exports = async () => {
    await mongoose.connect(mongooseString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}