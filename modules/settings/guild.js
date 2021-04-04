const mongo = require('@misc/mongo')
const guildSchema = require('@schemas/guildSchema')


const { MessageAttachment } = require('discord.js')

module.exports = (client) => {}

module.exports.getPrefix = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const result = await guildSchema.findOne({
                guildId,
})

            return result?.prefix
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setPrefix = async (guildId, prefix) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    prefix,
                }
            }, {
                upsert: true,
                new: true
            })

            return result.prefix
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.setWelcome = async (guildId, channelId, message) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const result = await guildSchema.findOneAndUpdate({
                guildId,
            }, {
                guildId,
                $set: {
                    welcome: {
                        channelId,
                        message,
                    }
                }
            }, {
                upsert: true,
                new: true
            })

            return result.prefix
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getWelcome = async (guildId) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const result = await guildSchema.findOne({
                guildId,
})

            return result?.welcome
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getAllPrefixes = async () => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const result = await guildSchema.find({
                __v: 0
            })
console.log(result)
            return result
        } finally {
            mongoose.connection.close()
        }
    })
}