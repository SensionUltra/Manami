const { MessageEmbed } = require('discord.js')
const mongo = require('@misc/mongo')
const globalProfileSchema = require('@schemas/globalProfileSchema')


module.exports.setRestartMessage = async(message, channel, client) => {
    console.log('setting restart message')
    return await mongo().then(async (mongoose) => {
        try {
            let userId = client.user.id
            console.log('Running FindOneAndUpdate()')
            const result = await globalProfileSchema.findOneAndUpdate({
                userId
            }, {
                userId,
                $set: {
                    client: {
                        restartMessage: {
                            message,
                            channel,
                        }
                    }
                }
            }, {
                upsert: true,
                new: true
            })
            return result.client.restartMessage
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getRestartMessage = async(client) => {
    return await mongo().then(async(mongoose) => {
        try {
            let userId = client.user.id
            const result = await globalProfileSchema.findOne({
                userId
            })
            const { channel, message } = result.client.restartMessage
            console.log(channel)
            const restartChannel = client.channels.cache.get(`${channel}`)
            const restartMessage = restartChannel.messages.cache.get(message)
            console.log(restartMessage)
return restartMessage
        } finally {
            mongoose.connection.close()
        }
    })
}