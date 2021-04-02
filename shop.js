const mongo = require('./mongo')
const profileSchema = require('./models/profileSchema')


const coinsCache = {}

const { MessageAttachment } = require('discord.js')

module.exports = (client) => {}

module.exports.buyItem = async (guildId, userId, item) => {
    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running FindOneAndUpdate()')
            const coins = (- + item.price)
            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId
            }, {
                guildId,
                userId,
                $push: {
                    items: item
                },
                $inc: {
                    coins
                }
            }, {
                upsert: true,
                new: true
            })

            coinsCache[`${guildId}-${userId}`] = result.coins
            
            return result.coins
        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getItems = async (guildId, userId) => {
    return await mongo().then(async mongoose => {
        try {
            console.log('running findone()')

            const result = await profileSchema.findOne({
                guildId,
                userId
            })

            console.log('RESULT:', result)
            const items = result?.items
            return items
        } finally {
            mongoose.connection.close()
        }
    })
}